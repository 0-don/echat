import React, { useEffect, useRef } from 'react';
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
dayjs.extend(relativeTime);

interface MessagesProps {}

export const Messages: React.FC<MessagesProps> = ({}) => {
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

  useEffect(() => {
    if (channel && !called) {
      getMessages({ variables: { channel, limit: 10, cursor: null } });
    }
  }, [getMessages, channel, called]);

  useEffect(() => {
    if (channel && called && refetch) {
      refetch({ channel, limit: 10, cursor: null });
    }
  }, [refetch, channel, called]);

  useEffect(() => {
    if (channel && subscribeToMore) {
      const messageSent = subscribeToMore<
        MessageSentSubscription,
        MessageSentSubscriptionVariables
      >({
        document: MessageSentDocument,
        variables: { channel },
        updateQuery: (prev, { subscriptionData }) =>
          produce(prev, (draft) => {
            if (draft.getMessages)
              draft.getMessages.messages = [
                ...(draft.getMessages?.messages || []),
                subscriptionData?.data?.messageSent,
              ];
          }),
      });

      return () => messageSent && messageSent();
    }
    return () => {};
  }, [channel, subscribeToMore]);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'auto' });
  }, [msg]);

  useEffect(() => {
    // set as read
    const messageIds = msg?.getMessages?.messages
      ?.filter((message) => message.userId !== meId && !message.read)
      .map((message) => message.id);
    if (refetch && messageIds && messageIds?.length > 0) {
      setAsRead({ variables: { messageIds } });
      refetch({ channel });
    }
  }, [msg]);

  const onScroll = async () => {

    if (
      scrollRef?.current?.scrollTop === 0 &&
      msg?.getMessages?.hasMore &&
      fetchMore
    ) {
      const cursor = msg?.getMessages?.messages[0]
        .createdAt as unknown as string;

      await fetchMore<GetMessagesQuery, GetMessagesQueryVariables>({
        query: GetMessagesDocument,
        variables: {
          channel,
          cursor,
          limit: 1,
        },
        updateQuery: (prev, { fetchMoreResult }) =>
          produce(prev, (draft) => {
            if (draft.getMessages) {
              draft.getMessages.messages = [
                ...(fetchMoreResult?.getMessages?.messages || []),
                ...(draft.getMessages?.messages || []),
              ];
              draft.getMessages.hasMore =
                fetchMoreResult?.getMessages?.hasMore || false;
            }
          }),
      });
    }
  };

  return (
    <>
      <div className='chat-area flex-1 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg'>
            Chatting with <b>{chattingWith?.user.username}</b>
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

        <SendMessage />
      </div>
    </>
  );
};
