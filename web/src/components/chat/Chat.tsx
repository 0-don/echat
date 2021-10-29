import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useChatStore from 'src/store/ChatStore';
import { Messages } from './Messages';
import { Rooms } from './Rooms';
import {
  useConnectRoomSubscription,
  useGetRoomsQuery,
  useMeQuery,
} from 'src/generated/graphql';
import { Notify } from './Notify';

export const Chat: React.FC = () => {
  const { data: me } = useMeQuery();
  const meUuid = me?.me?.uuid;
  if (!meUuid) {
    return null;
  }

  const { switchChatPopup, chatPopup, newMessagesCount, setNewMessagesCount } =
    useChatStore();
  const { data, refetch } = useGetRoomsQuery();
  const { data: _ } = useConnectRoomSubscription({
    variables: { channel: meUuid },
    onSubscriptionData: async () => {
      await refetch();
    },
  });

  useEffect(() => {
    const count = data?.getRooms?.reduce(
      (total, next) => total + next.newMessagesCount,
      0
    );
    setNewMessagesCount(count ?? 0);
  }, [data]);

  return (
    <>
      {data?.getRooms?.map(({ channel }) => (
        <Notify currentChannel={channel} key={channel} />
      ))}
      {chatPopup && (
        <div className='fixed bottom-0 right-0 z-50 md:mr-10 md:mb-10 mr-2 mb-2 flex text-white '>
          <div className='bg-dark-lightAlt rounded-tl-xl rounded-bl-xl md:w-80 px-2 pt-2'>
            <Rooms />
          </div>
          <div className='bg-dark p-5 rounded-tr-xl rounded-br-xl md:w-96 w-64 max-w-sm'>
            <Messages />
          </div>
        </div>
      )}
      {!chatPopup && (
        <div className='fixed bottom-0 right-0 z-10 mr-10 mb-10 flex flex-col items-end'>
          <FontAwesomeIcon
            size='4x'
            className='dark:text-white text-white bg-purple dark:bg-purple dark:hover:bg-purple-dark hover:bg-purple-dark p-2.5 rounded-full '
            icon='comment-dots'
            onClick={() => {
              switchChatPopup();
              // setNewMessagesCount(0);
            }}
          />
          {newMessagesCount > 0 && (
            <small className='text-xs bg-red-500 text-white rounded-full h-5 w-5 flex justify-center items-center -mt-5'>
              {newMessagesCount}
            </small>
          )}
        </div>
      )}
    </>
  );
};
