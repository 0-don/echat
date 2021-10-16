import { useState, FC } from 'react';
import { useSendMessageMutation } from 'src/generated/graphql';
import useChatStore from 'src/store/ChatStore';

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
    <div>
      <div className='flex-1'>
        <textarea
          name='message'
          className='appearance-none block w-full px-3 py-2 dark:bg-dark-light dark:border-dark-light dark:text-white border rounded-md shadow-sm focus:outline-none 
          dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple sm:text-sm focus:border-purple'
          rows={1}
          placeholder='Type a message...'
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className='flex-2 w-32 p-2 flex content-center items-center'>
        <div className='flex-1'>
          <button
            className='bg-blue-400 w-10 h-10 rounded-full inline-block'
            onClick={handleSend}
          >
            <span className='inline-block align-text-bottom'>
              <svg
                fill='none'
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                viewBox='0 0 24 24'
                className='w-4 h-4 text-white'
              >
                <path d='M5 13l4 4L19 7'></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
