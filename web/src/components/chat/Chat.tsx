import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useGetRoomsQuery } from 'src/generated/graphql';
import { Messages } from './Messages';
import { Rooms } from './Rooms';

export const Chat: React.FC = () => {
  const [currentChannel, setCurrentChannel] = useState<string>('5208');
  const { data, loading, error, subscribeToMore } = useGetRoomsQuery();

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div className='fixed bottom-0 right-0 z-10 mr-10 mb-10 flex flex-col items-end'>
      <div className='flex space-x-5 text-white bg-dark-light p-5 rounded-lg'>
        <Rooms
          data={data}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />

        <Messages
          data={data}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
          subscribeToMore={subscribeToMore}
        />
      </div>
      <FontAwesomeIcon
        size='4x'
        className='dark:text-white text-white bg-purple dark:bg-purple dark:hover:bg-purple-dark hover:bg-purple-dark p-2.5 rounded-full '
        icon='comment-dots'
      />
    </div>
  );
};
