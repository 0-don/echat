import React, { useEffect } from 'react';
import {
  MessageSentDocument,
  MessageSentSubscription,
  MessageSentSubscriptionVariables,
  useMeQuery,
  useGetRoomsQuery,
} from 'src/generated/graphql';
import SendMessage from './SendMessage';
import produce from 'immer';
import useChatStore from 'src/store/ChatStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface MessagesProps {}

export const Messages: React.FC<MessagesProps> = ({}) => {
  const { data: me } = useMeQuery();
  const meId = me?.me?.id;

  const { data, subscribeToMore } = useGetRoomsQuery();
  const { channel, switchChatPopup } = useChatStore();

  const messages = data?.getRooms?.find(
    (room) => room.channel === channel
  )?.messages;

  const participant = data?.getRooms
    ?.find((room) => room.channel === channel)
    ?.participants?.find((participant) => participant.userId !== meId);

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
        <div className='flex items-center justify-between'>
          <h2 className='text-lg'>
            Chatting with <b>{participant?.user.username}</b>
          </h2>
          <div
            className='cursor-pointer hover:text-purple'
            onClick={switchChatPopup}
          >
            ×︁
          </div>
        </div>
        <hr className='border-lightGray my-3' />
        <div className='overflow-auto h-96'>
          {messages?.map(({ userId, message, createdAt, id }) =>
            meId === userId ? (
              <div className='message me mb-4 flex text-right' key={id}>
                <div className='flex-1 px-2'>
                  <div className='inline-block bg-dark-light rounded-full py-1 px-6 text-white'>
                    <span>{message}</span>
                  </div>
                  <div className='pr-4'>
                    <small className='text-gray-500'>
                      {dayjs(createdAt).toNow(true)}
                    </small>
                  </div>
                </div>
              </div>
            ) : (
              <div className='message mb-4 flex' key={id}>
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
                  <div className='inline-block bg-purple rounded-full py-1 px-6 text-white'>
                    <span>{message}</span>
                  </div>
                  <div className='pl-4'>
                    <small className='text-gray-500'>
                      {dayjs(createdAt).toNow(true)}
                    </small>
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
