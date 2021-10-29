import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import React from 'react';
import {
  GetRoomsDocument,
  useDeleteRoomMutation,
  useGetRoomsQuery,
  useJoinRoomMutation,
  useMeQuery,
} from 'src/generated/graphql';
import useChatStore from 'src/store/ChatStore';
import { cache } from 'src/utils/apollo/withApollo';
import { notifyClear } from '../../utils/helpers/notifyClear';
import gray from '/public/gray.png';

dayjs.extend(relativeTime);

interface RoomsProps {}

export const Rooms: React.FC<RoomsProps> = ({}) => {
  const [deleteRoom] = useDeleteRoomMutation();
  const [joinRoom] = useJoinRoomMutation();
  const { data } = useGetRoomsQuery({ returnPartialData: true });

  const { setChannel, channel } = useChatStore();
  const { data: me } = useMeQuery();
  const meId = me?.me?.id;

  const globalChat = data?.getRooms?.find((room) => room.channel === 'global');
  return (
    <>
      <div className='flex flex-col justify-between h-full'>
        <div>
          {data?.getRooms?.map((room) => {
            const participant = room.participants?.find(
              (participant) => participant.userId !== meId
            )?.user;

            const profileImg = participant?.images?.find(
              (image) => image.type === 'profile'
            )?.url;

            return (
              <div
                key={room.channel}
                onClick={() => {
                  setChannel(room.channel);
                  notifyClear(room.channel);
                }}
                className={`${
                  channel === room.channel ? 'border-l-4 border-purple' : ''
                }  hover:border-l-4 hover:border-purple-dark overflow-x-hidden overflow-y-auto entry cursor-pointer transform duration-300 transition-transform bg-dark mb-1 rounded p-4 flex shadow-2xl`}
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
                      dayjs().diff(participant?.lastOnline, 'minutes') < 120
                        ? 'bg-green-600'
                        : 'bg-gray-400'
                    } absolute w-4 h-4 rounded-full right-0 bottom-0`}
                  ></span>
                </div>
                <div className='w-full ml-5 hidden md:block'>
                  <div className='flex justify-between'>
                    <span className='font-medium'>{participant?.username}</span>
                    {room?.newMessagesCount > 0 && (
                      <small className='text-xs bg-red-500 text-white rounded-full h-5 w-5 flex justify-center items-center'>
                        {room.newMessagesCount}
                      </small>
                    )}
                  </div>
                  <div className='flex justify-between'>
                    <div className='overflow-hidden truncate w-10 text-sm'>
                      {room?.newMessage}
                    </div>

                    <div className='flex space-x-1 items-center'>
                      {room?.lastMessageDate && (
                        <small>{dayjs(room.lastMessageDate).toNow(true)}</small>
                      )}
                      <FontAwesomeIcon
                        size='sm'
                        title='delete chats'
                        className='dark:text-white text-white dark:hover:text-purple hover:text-purple mt-0.5 mr-[4px]'
                        icon='trash-alt'
                        onClick={async () => {
                          await deleteRoom({
                            variables: { channel: room.channel },
                            refetchQueries: [{ query: GetRoomsDocument }],
                          });
                          setChannel('');
                          cache.evict({
                            id: 'ROOT_QUERY',
                            fieldName: 'getMessages',
                            broadcast: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!globalChat && (
          <div
            className='flex justify-center items-center mb-2'
            onClick={async () =>
              await joinRoom({
                variables: { channel: 'global' },
                refetchQueries: [{ query: GetRoomsDocument }],
              })
            }
          >
            <FontAwesomeIcon
              size='2x'
              title='enter global chat'
              className='dark:text-white text-white dark:hover:text-purple hover:text-purple'
              icon='globe'
            />
          </div>
        )}
      </div>
    </>
  );
};
