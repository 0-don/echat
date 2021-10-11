import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Root,
  PubSub,
  PubSubEngine,
  Subscription,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Room } from '../entity/Room';

const channel = 'CHAT_CHANNEL';

@Resolver()
export class ChatResolver {
  // @Query(() => [Chat])
  // async getChats(@PubSub() pubSub: PubSubEngine) {
  //   console.log(pubSub);
  //   const chats = await Chat.find({});
  //   return chats;
  // }
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
