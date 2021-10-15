import { SubscribeToMoreOptions } from '@apollo/client';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Exact,
  GetRoomsQuery,
  MessageSentDocument,
  MessageSentSubscription,
  MessageSentSubscriptionResult,
  MessageSentSubscriptionVariables,
} from 'src/generated/graphql';
import SendMessage from './SendMessage';
import produce from 'immer';

interface MessagesProps {
  data: GetRoomsQuery | undefined;
  currentChannel: string;
  setCurrentChannel: Dispatch<SetStateAction<string>>;
  subscribeToMore: <
    TSubscriptionData = GetRoomsQuery,
    TSubscriptionVariables = Exact<{
      [key: string]: never;
    }>
  >(
    options: SubscribeToMoreOptions<
      GetRoomsQuery,
      TSubscriptionVariables,
      TSubscriptionData
    >
  ) => () => void;
}

export const Messages: React.FC<MessagesProps> = ({
  data,
  currentChannel,
  setCurrentChannel,
  subscribeToMore,
}) => {
  const messages = data?.getRooms?.find(
    (room) => room.channel === currentChannel
  )?.messages;

  useEffect(() => {
    subscribeToMore<MessageSentSubscription, MessageSentSubscriptionVariables>({
      document: MessageSentDocument,
      variables: { channel: currentChannel },
      updateQuery: (prev, { subscriptionData }) => {
        const newState = produce(prev, (draft) => {
          const room = draft?.getRooms?.find(
            (room) => room.channel === currentChannel
          );
          
          subscriptionData?.data?.messageSent &&
            room?.messages?.push(subscriptionData.data.messageSent);
        });


        return newState;
      },
    });
  }, []);

  return (
    <div>
      {messages?.map((message, index) => (
        <div key={index}>{message.message}</div>
      ))}
      <SendMessage channel={currentChannel} />
    </div>
  );
};
