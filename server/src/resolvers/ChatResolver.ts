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
} from 'type-graphql';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';

// const channel = 'CHAT_CHANNEL';

@Resolver()
export class ChatResolver {
  @Query(() => [Room], { nullable: true })
  async getRooms(@PubSub() pubSub: PubSubEngine, @Ctx() { req }: MyContext) {
    console.log(pubSub );
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

    // const rooms = await Room.find();

    return rooms;
  }

  @Mutation(() => Room, { nullable: true })
  async createRoom(
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine,
    @Arg('participantId', () => Int) participantId: number
  ) {
    // 11984
    const me = await User.findOne({ where: { id: req.session.userId } });
    const participant = await User.findOne({ where: { id: participantId } });

    if (!me || !participant) {
      return null;
    }

    const channel = me.uuid + participant.uuid;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Room)
        .values({ channel })
        .returning('*')
        .execute();

      const room: Room = result.raw[0];

      await Participant.insert([
        { userId: me.id, roomId: room.id },
        { userId: participant.id, roomId: room.id },
      ]);

      await pubSub.publish(room.channel, '');
      return room;
    } catch (error) {
      return null;
    }
  }
  // @Subscription({ topics: channel })
  // messageSent(@Root() chat: Chat): Chat {
  //   console.log(chat);
  //   return chat;
  // }
}
