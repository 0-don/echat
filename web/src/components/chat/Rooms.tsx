import React from 'react';
import { useGetRoomsQuery, useMeQuery } from 'src/generated/graphql';
import gray from '/public/gray.png';
import Image from 'next/image';
import useChatStore from 'src/store/ChatStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface RoomsProps {}

export const Rooms: React.FC<RoomsProps> = ({}) => {
  const { data } = useGetRoomsQuery();
  const { setChannel } = useChatStore();
  const { data: me } = useMeQuery();
  const meId = me?.me?.id;

  return (
    <div>
      {data?.getRooms?.map((room) => {
        const participant = room.participants?.find(
          (participant) => participant.userId !== meId
        )?.user;

        const lastMessage =
          room.messages && room?.messages[room.messages.length - 1];

        const profileImg = participant?.images?.find(
          (image) => image.type === 'profile'
        )?.url;
        console.log(lastMessage);
        return (
          <div
            key={room.channel}
            onClick={() => setChannel(room.channel)}
            className='border-l-4 border-purple entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-dark mb-4 rounded p-4 flex shadow-2xl'
          >
            <div className='flex-2'>
              <div className='w-12 h-12 relative'>
                <Image
                  width={45}
                  height={45}
                  layout='fixed'
                  objectFit='cover'
                  className='rounded-full'
                  src={profileImg ?? gray.src}
                />
                <span className='absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
              </div>
            </div>
            <div className='flex-1 px-2'>
              <div className='truncate w-32'>
                <span>{participant?.username}</span>
              </div>
              <div>
                <small>{lastMessage?.message}</small>
              </div>
            </div>
            <div className='flex-2 text-right'>
              <div>
                <small>{dayjs(lastMessage?.createdAt).toNow(true)}</small>
              </div>
              <div>
                <small className='text-xs bg-red-500  rounded-full h-6 w-6 leading-6 text-center inline-block'>
                  10
                </small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
