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
    <>
      <div className='text-white fixed bottom-0 right-0 z-10 bg-dark-light p-5 rounded-lg mr-10 mb-10'>
        <div className='flex space-x-5'>
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
      </div>
    </>
  );
};
