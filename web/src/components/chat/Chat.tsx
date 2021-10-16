import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useChatStore from 'src/store/ChatStore';
import { Messages } from './Messages';
import { Rooms } from './Rooms';

export const Chat: React.FC = () => {
  const { switchChatPopup, chatPopup } = useChatStore();

  return (
    <div className='fixed bottom-0 right-0 z-10 mr-10 mb-10 flex flex-col items-end'>
      {chatPopup && (
        <div className='flex text-white'>
          <div className='bg-dark rounded-tl-xl rounded-bl-xl px-2'>
            <Rooms />
          </div>
          <div className='bg-gray-900 p-5 rounded-tr-xl rounded-br-xl'>
            <Messages />
          </div>
        </div>
      )}
      <FontAwesomeIcon
        size='4x'
        className='dark:text-white text-white bg-purple dark:bg-purple dark:hover:bg-purple-dark hover:bg-purple-dark p-2.5 rounded-full '
        icon='comment-dots'
        onClick={switchChatPopup}
      />
    </div>
  );
};
