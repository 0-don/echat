import { useState } from 'react';
import { useSendMessageMutation } from 'src/generated/graphql';
import useChatStore from 'src/store/ChatStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SendMessageProps {}

const SendMessage: React.FC<SendMessageProps> = ({}) => {
  const [message, setMessage] = useState<string>('');
  const [sendMessage] = useSendMessageMutation();
  const { channel } = useChatStore();

  const handleSend = async (e: any) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    await sendMessage({ variables: { channel, message } });
    setMessage('');
  };

  if (!channel) {
    return null;
  }

  return (
    <form onSubmit={handleSend} className='w-full flex items-center'>
      <input
        name='message'
        className='appearance-none block w-full px-3 py-2 dark:bg-dark-light dark:border-dark-light dark:text-white border rounded-md shadow-sm focus:outline-none 
          dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple sm:text-sm focus:border-purple'
        placeholder='Type a message...'
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <FontAwesomeIcon
        size='1x'
        className='dark:text-white text-white -ml-8 cursor-pointer z-10'
        icon='share'
        onClick={handleSend}
      />
    </form>
  );
};

export default SendMessage;
