import { useState, FC } from 'react';
import { useSendMessageMutation } from 'src/generated/graphql';
import useChatStore from 'src/store/ChatStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SendMessageProps {}

const SendMessage: FC<SendMessageProps> = () => {
  const [message, setMessage] = useState<string>('');
  const [sendMessage] = useSendMessageMutation();
  const { channel } = useChatStore();

  const handleSend = async () => {
    await sendMessage({ variables: { channel, message } });
    setMessage('');
  };

  return (
    <div className='flex items-center mt-3'>
      <input
        name='message'
        className='appearance-none block w-full px-3 py-2 dark:bg-dark-light dark:border-dark-light dark:text-white border rounded-md shadow-sm focus:outline-none 
          dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple sm:text-sm focus:border-purple'
        placeholder='Type a message...'
        autoFocus
        value={message}
        onSubmit={handleSend}
        onChange={(e) => setMessage(e.target.value)}
      />
      <FontAwesomeIcon
        size='1x'
        className='dark:text-white text-white -ml-8 cursor-pointer'
        icon='share'
        onClick={handleSend}
      />
    </div>
  );
};

export default SendMessage;
