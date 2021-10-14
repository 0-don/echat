import { useState, FC } from 'react';
import {
  useSendMessageMutation,
} from 'src/generated/graphql';

interface SendMessageProps {
  channel: string
}

const SendMessage: FC<SendMessageProps> = ({ channel }) => {
  const [message, setMessage] = useState<string>('');
  const [sendMessage] = useSendMessageMutation();

  const handleSend = async () => {
    await sendMessage({ variables: { channel, message } });
    setMessage('');
  };

  return (
    <div>
      <input
        className='text-black'
        type='text'
        id='message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={handleSend}>Send message</button>
    </div>
  );
};

export default SendMessage;
