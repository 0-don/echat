import React, { Dispatch, SetStateAction } from 'react';
import { GetRoomsQuery, useMeQuery } from 'src/generated/graphql';
import gray from '/public/gray.png';
import Image from 'next/image';

interface RoomsProps {
  data: GetRoomsQuery | undefined;
  currentChannel: string;
  setCurrentChannel: Dispatch<SetStateAction<string>>;
}

export const Rooms: React.FC<RoomsProps> = ({
  data,
  currentChannel,
  setCurrentChannel,
}) => {
  const { data: me } = useMeQuery();
  const meId = me?.me?.id;

  return (
    <div>
      {data?.getRooms?.map((room) => {
        const participant = room.participants?.find(
          (participant) => participant.userId !== meId
        )?.user;

        const profile = participant?.images?.find(
          (image) => image.type === 'profile'
        )?.url;

        return (
          <div
            key={room.channel}
            onClick={() => setCurrentChannel(room.channel)}
            className={`${
              room.channel === currentChannel ? 'bg-purple' : 'bg-dark-dark'
            } flex space-x-5  px-5 py-2 rounded-md`}
          >
            <Image
              width={'35'}
              height={'35'}
              layout='fixed'
              objectFit='cover'
              className='rounded-full'
              src={profile ?? gray.src}
            />
            <div className='text-2xl font-medium'>{participant?.username}</div>
          </div>
        );
      })}
    </div>
  );
};
