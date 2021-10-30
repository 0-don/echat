import React, { useEffect, useRef, useState } from 'react';
import {
  MessageSentDocument,
  MessageSentSubscription,
  MessageSentSubscriptionVariables,
  useMeQuery,
  useGetRoomsQuery,
  useGetMessagesLazyQuery,
  useSetAsReadMutation,
  GetMessagesQuery,
  GetMessagesQueryVariables,
  GetMessagesDocument,
} from 'src/generated/graphql';
import SendMessage from './SendMessage';
import produce from 'immer';
import useChatStore from 'src/store/ChatStore';
import Image from 'next/image';
import gray from '/public/gray.png';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
dayjs.extend(relativeTime);

interface MessagesProps {}

export const Messages: React.FC<MessagesProps> = ({}) => {
  const [bottom, setBottom] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [setAsRead] = useSetAsReadMutation();
  const { channel, switchChatPopup } = useChatStore();
  const { data: me } = useMeQuery();
  const { data } = useGetRoomsQuery();
  const [
    getMessages,
    { called, refetch, data: msg, subscribeToMore, fetchMore },
  ] = useGetMessagesLazyQuery();

  const meId = me?.me?.id;
  const room = data?.getRooms?.find((room) => room.channel === channel);
  const chattingWith = room?.participants?.find(
    (participant) => participant.userId !== meId
  );
  const messageIds = msg?.getMessages?.messages
    ?.filter((message) => message.userId !== meId && !message.read)
    .map((message) => message.id);

  useEffect(() => {
    // get first messages
    if (channel && !called) {
      getMessages({ variables: { channel, limit: 10, cursor: null } });
      messagesEndRef?.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [getMessages, channel, called]);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (bottom === 0) {
      messagesEndRef?.current?.scrollIntoView({ behavior: 'auto' });
    }

    if (refetch && messageIds && messageIds?.length > 0 && bottom < 25) {
      setAsRead({ variables: { messageIds } });
      refetch({ channel });
    }
  }, [msg]);

  useEffect(() => {
    // refetch
    (async () => {
      if (channel && called && refetch) {
        await refetch({ channel, limit: 10, cursor: null });
        messagesEndRef?.current?.scrollIntoView({ behavior: 'auto' });
      }
    })();
  }, [refetch, channel, called]);

  useEffect(() => {
    // subscribe for new messages
    if (channel && subscribeToMore) {
      const messageSent = subscribeToMore<
        MessageSentSubscription,
        MessageSentSubscriptionVariables
      >({
        document: MessageSentDocument,
        variables: { channel },
        updateQuery: (prev, { subscriptionData }) =>
          produce(prev, (draft) => {
            draft.getMessages.messages = [
              ...draft.getMessages.messages,
              subscriptionData.data.messageSent,
            ];
          }),
      });

      return () => messageSent && messageSent();
    }
    return () => {};
  }, [channel, subscribeToMore]);

  const onScroll = async () => {
    // set as read if at chat bottom
    scrollRef.current &&
      setBottom(
        scrollRef?.current?.scrollHeight -
          (scrollRef?.current?.scrollTop + scrollRef?.current?.clientHeight)
      );

    if (refetch && messageIds && messageIds?.length > 0 && bottom < 25) {
      await setAsRead({ variables: { messageIds } });
      await refetch({ channel });
    }

    // check if scroll top to load old messages
    if (
      scrollRef?.current?.scrollTop === 0 &&
      msg?.getMessages?.hasMore &&
      fetchMore
    ) {
      let current = scrollRef?.current?.scrollHeight;
      const cursor = msg?.getMessages?.messages[0]
        .createdAt as unknown as string;

      await fetchMore<GetMessagesQuery, GetMessagesQueryVariables>({
        query: GetMessagesDocument,
        variables: {
          channel,
          cursor,
          limit: 5,
        },
      });
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight - current;
      }
    }
  };

  return (
    <>
      <div className='chat-area flex-1 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg'>
            Chatting with{' '}
            <b>
              {room?.channel === 'global'
                ? 'global chat'
                : chattingWith?.user.username}
            </b>
          </h2>
          <div
            className='cursor-pointer hover:text-purple'
            onClick={switchChatPopup}
          >
            ×︁
          </div>
        </div>
        <hr className='border-lightGray my-3' />
        <div
          className='overflow-x-hidden overflow-y-auto h-96'
          ref={scrollRef}
          onScroll={onScroll}
        >
          {msg?.getMessages?.messages.map(
            ({ userId, message, createdAt, id }) => {
              const user = room?.participants?.find(
                (participant) => participant.userId === userId
              )?.user;
              const profileImg = user?.images?.find(
                (image) => image.type === 'profile'
              )?.url;

              return (
                <div key={id}>
                  {meId === userId ? (
                    <div className='mb-4 flex text-right'>
                      <div className='flex-1 px-2'>
                        <div className='inline-block bg-dark-light rounded-xl py-1 px-6 text-white break-all'>
                          <span>{message}</span>
                        </div>
                        <div>
                          <small className='text-gray-500'>
                            {dayjs(createdAt).toNow(true)}
                          </small>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='mb-4 flex'>
                      <div className='flex-2'>
                        <div className='w-12 h-12 relative'>
                          <Image
                            width={45}
                            height={45}
                            layout='fixed'
                            objectFit='cover'
                            className='rounded-full'
                            src={profileImg ?? gray.src}
                            title={user?.username}
                          />
                          <span
                            className={`${
                              dayjs().diff(user?.lastOnline, 'minutes') < 120
                                ? 'bg-green-600'
                                : 'bg-gray-400'
                            } absolute w-4 h-4 rounded-full right-0 bottom-0`}
                          ></span>
                        </div>
                      </div>
                      <div className='flex-1 px-2'>
                        <div className='inline-block bg-purple rounded-xl py-1 px-6 text-white'>
                          <span>{message}</span>
                        </div>
                        <div className='pl-4'>
                          <small className='text-gray-500'>
                            {dayjs(createdAt).toNow(true)}
                          </small>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}
          <div ref={messagesEndRef} />
        </div>
        {bottom > 25 && (
          <div className='flex w-full justify-end'>
            <div
              className='z-20'
              onClick={() => {
                messagesEndRef?.current?.scrollIntoView({ behavior: 'auto' });
                setBottom(0);
              }}
            >
              <span className='rounded-full bg-purple flex justify-center items-center cursor-pointer -mt-10 mr-3 z-10 h-7 w-7'>
                <FontAwesomeIcon
                  size='1x'
                  className='dark:text-white text-white'
                  icon='angle-double-down'
                />
              </span>
              {messageIds && messageIds.length > 0 && (
                <small className='text-xs bg-red-500 text-white rounded-full h-3.5 w-3.5 flex justify-center items-center -mt-3'>
                  {messageIds.length}
                </small>
              )}
            </div>
          </div>
        )}

        <SendMessage />
      </div>
    </>
  );
};
