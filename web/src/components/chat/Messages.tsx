import React, { useEffect } from 'react';
import {
  MessageSentDocument,
  MessageSentSubscription,
  MessageSentSubscriptionVariables,
  useMeQuery,
} from 'src/generated/graphql';
import SendMessage from './SendMessage';
import produce from 'immer';
import useChatStore from 'src/store/ChatStore';
import { useGetRoomsQuery } from 'src/generated/graphql';

interface MessagesProps {}

export const Messages: React.FC<MessagesProps> = ({}) => {
  const { data: me } = useMeQuery();
  const meId = me?.me?.id;
  
  const { data, subscribeToMore } = useGetRoomsQuery();
  const { channel, switchChatPopup } = useChatStore();

  const messages = data?.getRooms?.find(
    (room) => room.channel === channel
  )?.messages;

  useEffect(() => {
    subscribeToMore<MessageSentSubscription, MessageSentSubscriptionVariables>({
      document: MessageSentDocument,
      variables: { channel },
      updateQuery: (prev, { subscriptionData }) => {
        const newState = produce(prev, (draft) => {
          const room = draft?.getRooms?.find(
            (room) => room.channel === channel
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
      <div className='chat-area flex-1 flex flex-col'>
        <div className='flex-3'>
          <h2 className='text-xl py-1 mb-8 border-b-2 border-gray-200'>
            Chatting with <b>Mercedes Yemelyan</b>
          </h2>
        </div>
        <div className='messages flex-1 overflow-auto'>
          {messages?.map(({ userId, message }) =>
            meId === userId ? (
              <div className='message me mb-4 flex text-right'>
                <div className='flex-1 px-2'>
                  <div className='inline-block bg-blue-600 rounded-full p-2 px-6 text-white'>
                    <span>{message}</span>
                  </div>
                  <div className='pr-4'>
                    <small className='text-gray-500'>15 April</small>
                  </div>
                </div>
              </div>
            ) : (
              <div className='message mb-4 flex'>
                <div className='flex-2'>
                  <div className='w-12 h-12 relative'>
                    <img
                      className='w-12 h-12 rounded-full mx-auto'
                      src='https://res.cloudinary.com/don-cryptus/image/upload/v1633542026/ahpca1fbkglqb42ldw3f.jpg'
                      alt='chat-user'
                    />
                    <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
                  </div>
                </div>
                <div className='flex-1 px-2'>
                  <div className='inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700'>
                    <span>{message}</span>
                  </div>
                  <div className='pl-4'>
                    <small className='text-gray-500'>15 April</small>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <SendMessage />
      </div>
    </div>
  );
};
