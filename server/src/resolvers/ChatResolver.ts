import { Participant } from '../entity/Participant';
import { Room } from '../entity/Room';
import { MyContext } from '../utils/types/MyContext';
import {
  Arg,
  Ctx,
  Int,
  Mutation,
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

@Resolver()
export class ChatResolver {
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

  @Query(() => [Message], { nullable: true })
  async getMessages(
    @Ctx() { req }: MyContext,
    @Arg('channel') channel: string
  ) {
    const { userId } = req.session;
    const messages = await getRepository(Message)
      .createQueryBuilder('message')
      .leftJoinAndSelect(Room, 'room', 'room.id = message.roomId')
      .andWhere('message.userId = :userId AND room.channel = :channel', {
        userId,
        channel,
      })
      .getMany();

    if (!messages.length) {
      return null;
    }

    return messages;
  }

  @Mutation(() => String, { nullable: true })
  async createRoom(
    @Ctx() { req }: MyContext,
    @Arg('participantId', () => Int) participantId: number
  ) {
    // 26904 -> test@test.test
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

      await Participant.insert([
        { userId: me.id, roomId: room.id },
        { userId: participant.id, roomId: room.id },
      ]);
    }

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
}
