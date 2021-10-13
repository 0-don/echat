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

// const channel = 'CHAT_CHANNEL';

@Resolver()
export class ChatResolver {
  @Query(() => [Room], { nullable: true })
  async getRooms(@PubSub() pubSub: PubSubEngine, @Ctx() { req }: MyContext) {
    console.log(pubSub);
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
    // 26904 -> test@test.test
    const users = await getRepository(User).find({
      where: { id: In([req.session.userId, participantId]) },
    });

    const me = users.find((user) => user.id === req.session.userId);
    const participant = users.find((user) => user.id === participantId);

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

      await pubSub.publish('sda', room);
      return room;
    } catch (error) {
      return null;
    }
  }

  @Subscription({
    topics: (test) => {
      console.log(test.args);
      return 'sda';
    },
  })
  messageSent(@Root() room: Room,): Room {
    // console.log(room);
    return room;
  }
}
