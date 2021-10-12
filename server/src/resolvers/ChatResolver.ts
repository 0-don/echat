import { Participant } from '../entity/Participant';
import { Room } from '../entity/Room';
import { MyContext } from '../utils/types/MyContext';
import { Ctx, PubSub, PubSubEngine, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import fs from 'fs';

// const channel = 'CHAT_CHANNEL';

@Resolver()
export class ChatResolver {
  @Query(() => [Room])
  async getChats(@PubSub() pubSub: PubSubEngine, @Ctx() { req }: MyContext) {
    console.log(pubSub);

    const { userId } = req.session;
    const chats = await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect(
        Participant,
        'participant',
        'participant.roomId = room.id'
      )
      .andWhere('participant.userId IN :userId)', {
        userId,
      })
      .getMany();

    // const chats = await Room.find();

    return chats;
  }

  // @Mutation(() => Chat)
  // async createChat(
  //   @PubSub() pubSub: PubSubEngine,
  //   @Arg('name') name: string,
  //   @Arg('message') message: string
  // ): Promise<Chat> {
  //   const result = await getConnection()
  //     .createQueryBuilder()
  //     .insert()
  //     .into(Chat)
  //     .values({ name, message })
  //     .returning('*')
  //     .execute();
  //   const chat = result.raw[0];
  //   await pubSub.publish(channel, chat);
  //   return chat;
  // }
  // @Subscription({ topics: channel })
  // messageSent(@Root() chat: Chat): Chat {
  //   console.log(chat);
  //   return chat;
  // }
}
