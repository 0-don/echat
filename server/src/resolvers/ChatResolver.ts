import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Root,
  PubSub,
  PubSubEngine,
  Subscription,
} from "type-graphql";
import { Chat } from "../entity/Chat";

const chats: Chat[] = [];
const channel = "CHAT_CHANNEL";

@Resolver()
export class ChatResolver {
  @Query(() => [Chat])
  getChats(): Chat[] {
    return chats;
  }

  @Mutation(() => Chat)
  async createChat(
    @PubSub() pubSub: PubSubEngine,
    @Arg("name") name: string,
    @Arg("message") message: string
  ): Promise<Chat> {
    const chat = { id: chats.length + 1, name, message };
    chats.push(chat);
    const payload = chat;
    await pubSub.publish(channel, payload);
    return chat;
  }

  @Subscription({ topics: channel })
  messageSent(@Root() { id, name, message }: Chat): Chat {
    return { id, name, message };
  }
}
