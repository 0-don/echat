import { useState, FC } from 'react';
import { useCreateRoomMutation } from 'src/generated/graphql';

interface SendMessageProps {
  name: string;
}

const SendMessage: FC<SendMessageProps> = ({ name }) => {
  const [input, setInput] = useState<string>('');
  const [createChat] = useCreateRoomMutation();

  const handleSend = async () => {
    await createChat({ variables: { participantId: 26904 } });
    setInput('');
  };

  return (
    <div>
      <input
        className='text-black'
        type='text'
        id='message'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button onClick={handleSend}>Send message</button>
    </div>
  );
};

export default SendMessage;
