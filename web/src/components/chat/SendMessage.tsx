import { useState, FC } from 'react';
import { useCreateChatMutation } from 'src/generated/graphql';

interface SendMessageProps {
  name: string;
}

const SendMessage: FC<SendMessageProps> = ({ name }) => {
  const [input, setInput] = useState<string>('');
  const [createChat] = useCreateChatMutation();

  const handleSend = async () => {
    await createChat({ variables: { name: name, message: input } });
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
