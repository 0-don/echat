import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useChatStore from 'src/store/ChatStore';
import { Messages } from './Messages';
import { Rooms } from './Rooms';
import { useGetRoomsQuery } from 'src/generated/graphql';
import { Notify } from './Notify';

export const Chat: React.FC = () => {
  const { switchChatPopup, chatPopup } = useChatStore();
  const { data } = useGetRoomsQuery();

  return (
    <>
      {data?.getRooms?.map(({ channel }) => (
        <Notify currentChannel={channel} key={channel} />
      ))}
      {chatPopup && (
        <div className='fixed bottom-0 right-0 z-10 mr-10 mb-10 flex text-white '>
          <div className='bg-dark-lightAlt rounded-tl-xl rounded-bl-xl w-80 px-2 pt-2'>
            <Rooms />
          </div>
          <div className='bg-dark p-5 rounded-tr-xl rounded-br-xl w-96 max-w-sm'>
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
            onClick={switchChatPopup}
          />
        </div>
      )}
    </>
  );
};
