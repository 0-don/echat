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
  const { setChannel, channel } = useChatStore();
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

        return (
          <div
            key={room.channel}
            onClick={() => setChannel(room.channel)}
            className={`${
              channel === room.channel ? 'border-l-4 border-purple' : ''
            }  entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-dark mb-1 rounded p-4 flex shadow-2xl`}
          >
            <div className='w-12 h-12 relative'>
              <Image
                width={45}
                height={45}
                layout='fixed'
                objectFit='cover'
                className='rounded-full'
                src={profileImg ?? gray.src}
              />
              <span
                className={`${
                  dayjs(new Date()).diff(participant?.lastOnline, 'minutes') <
                  120
                    ? 'bg-green-600'
                    : 'bg-gray-400'
                } absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0`}
              ></span>
            </div>
            <div className='w-full ml-5'>
              <div className='flex justify-between'>
                <span className='font-medium'>{participant?.username}</span>
                <small className='text-xs bg-red-500 rounded-full h-5 w-5 flex justify-center items-center'>
                  10
                </small>
              </div>
              <div className='flex justify-between'>
                <div className='overflow-hidden truncate w-10 text-sm'>
                  {lastMessage?.message}
                </div>
                <small>{dayjs(lastMessage?.createdAt).toNow(true)}</small>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
