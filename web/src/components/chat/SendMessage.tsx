import { useState, FC } from 'react';
import { gql, useMutation } from '@apollo/client';

const SEND_MESSAGE = gql`
  mutation createChat($name: String!, $message: String!) {
    createChat(name: $name, message: $message) {
      id
      name
      message
    }
  }
`;

interface SendMessageProps {
  name: string;
}

const SendMessage: FC<SendMessageProps> = ({ name }) => {
  const [input, setInput] = useState<string>('');
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = () => {
    sendMessage({ variables: { name: name, message: input } })
      .then((data) => {
        setInput('');
      })
      .catch((err) => console.log(err));
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
