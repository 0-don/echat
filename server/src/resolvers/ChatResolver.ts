import { Participant } from '../entity/Participant';
import { Room } from '../entity/Room';
import { MyContext } from '../utils/types/MyContext';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { getConnection, getRepository, In } from 'typeorm';
import { User } from '../entity/User';
import { Message } from '../entity/Message';
import { groupBy } from 'lodash';
import { Loader } from 'type-graphql-dataloader';
import DataLoader from 'dataloader';
import { log } from 'console';

@ObjectType()
class PaginatedMessages {
  @Field(() => [Message])
  messages: Message[];
  @Field()
  hasMore: boolean;
}

@Resolver(Room)
export class ChatResolver {
  @FieldResolver(() => Number)
  @Loader<{ roomIds: number; userId: number }, number>(async (room) => {
    const roomIds = room.map((room) => room.roomIds);
    const userId = room[0].userId;
    const messages = await getRepository(Message)
      .createQueryBuilder('message')
      .leftJoinAndSelect(Room, 'room', 'room.id = message.roomId')
      .andWhere(
        'room.id IN (:...roomIds) AND message.userId <> :userId AND message.read = FALSE',
        {
          roomIds,
          userId,
        }
      )
      .getMany();

    const messagesByRoomId = groupBy(messages, 'roomId');
    const result = roomIds.map(
      (roomId) => messagesByRoomId[roomId]?.length ?? 0
    );

    return result;
  })
  newMessagesCount(@Root() root: Room, @Ctx() { req }: MyContext) {
    return (
      dataloader: DataLoader<{ roomIds: number; userId: number }, number>
    ) => dataloader.load({ roomIds: root.id, userId: req.session.userId });
  }

  @Mutation(() => Boolean)
  async joinRoom(@Ctx() { req }: MyContext, @Arg('channel') channel: string) {
    const { userId } = req.session;
    const room = await Room.findOne({ where: { channel } });

    if (!room) {
      return false;
    }

    try {
      await Participant.insert({ userId, roomId: room.id });
    } catch (err) {
      log(err);
    }

    return true;
  }

  @Query(() => PaginatedMessages)
  async getMessages(
    @Ctx() { req }: MyContext,
    @Arg('channel') channel: string,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor?: string
  ) {
    const { userId } = req.session;

    if (!channel || !limit) {
      return {
        messages: [],
        hasMore: false,
      };
    }

    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const qb = getRepository(Message)
      .createQueryBuilder('message')
      .leftJoinAndSelect(Room, 'room', 'room.id = message.roomId')
      .leftJoinAndSelect(
        Participant,
        'participant',
        'participant.roomId = room.id'
      )
      .andWhere('participant.userId = :userId AND room.channel = :channel', {
        channel,
        userId,
      });
    if (cursor) {
      qb.andWhere('message.createdAt < :cursor', {
        cursor: new Date(cursor),
      });
    }

    const messages = await qb
      .orderBy('message.createdAt', 'DESC')
      .limit(reaLimitPlusOne)
      .getMany();

    if (!messages.length) {
      return {
        messages: [],
        hasMore: false,
      };
    }

    return {
      messages: messages.slice(0, realLimit).sort((a, b) => a.id - b.id),
      hasMore: messages.length === reaLimitPlusOne,
    };
  }

  @Mutation(() => Boolean)
  async setAsRead(@Arg('messageIds', () => [Int]) messageIds: number[]) {
    await Message.update(messageIds, { read: true });
    return true;
  }

  @Query(() => [Room], { nullable: true })
  async getRooms(@Ctx() { req }: MyContext) {
    const { userId } = req.session;
    const rooms = await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect(
        Participant,
        'participant',
        'participant.roomId = room.id'
      )
      .andWhere('participant.userId = :userId', {
        userId,
      })
      .getMany();

    if (!rooms.length) {
      return null;
    }

    return rooms;
  }

  @Mutation(() => String, { nullable: true })
  async createRoom(
    @Ctx() { req }: MyContext,
    @Arg('participantId', () => Int) participantId: number,
    @PubSub() pubSub: PubSubEngine
  ) {
    // 4730 -> test@test.test
    const users = await getRepository(User).find({
      where: { id: In([req.session.userId, participantId]) },
    });

    const me = users.find((user) => user.id === req.session.userId);
    const participant = users.find((user) => user.id === participantId);

    if (!me || !participant) {
      return null;
    }

    const channel =
      [...me.uuid].map((x) => x.charCodeAt(0)).reduce((a, b) => a + b) +
      [...participant.uuid].map((x) => x.charCodeAt(0)).reduce((a, b) => a + b);

    let room = await Room.findOne({ where: { channel: channel.toString() } });

    if (!room) {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Room)
        .values({ channel: channel.toString() })
        .returning('*')
        .execute();

      room = result.raw[0] as Room;
    }

    try {
      await Participant.insert([
        { userId: me.id, roomId: room.id },
        { userId: participant.id, roomId: room.id },
      ]);
    } catch (error) {}

 
    await pubSub.publish(participant.uuid, room);

    return room.channel;
  }

  @Mutation(() => Message, { nullable: true })
  async sendMessage(
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine,
    @Arg('channel') channel: string,
    @Arg('message') message: string
  ) {
    const { userId } = req.session;
    const room = await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect(
        Participant,
        'participant',
        'participant.roomId = room.id'
      )
      .andWhere('participant.userId = :userId AND room.channel = :channel', {
        userId,
        channel,
      })
      .getOne();

    if (!room) {
      return null;
    }

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Message)
      .values({ userId, message, roomId: room.id })
      .returning('*')
      .execute();

    const messageDB = result.raw[0] as Message;

    await pubSub.publish(channel, messageDB);

    return messageDB;
  }

  @Mutation(() => Boolean)
  async deleteRoom(@Ctx() { req }: MyContext, @Arg('channel') channel: string) {
    const { userId } = req.session;
    const room = await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect(
        Participant,
        'participant',
        'participant.roomId = room.id'
      )
      .andWhere('participant.userId = :userId AND room.channel = :channel', {
        userId,
        channel,
      })
      .getOne();

    if (!room) {
      return false;
    }

    if (channel === 'global') {
      await Participant.delete({ userId, roomId: room.id });
    } else {
      await Room.delete({ id: room.id });
    }

    return true;
  }

  @Subscription({
    topics: ({ args }) => args.channel,
  })
  messageSent(
    @Arg('channel') channel: string,
    @Root() message: Message
  ): Message {
    channel;
    return message;
  }

  @Subscription({
    topics: ({ args }) => args.channel,
  })
  connectRoom(@Arg('channel') channel: string, @Root() room: Room): Room {

    channel;
    return room;
  }
}
