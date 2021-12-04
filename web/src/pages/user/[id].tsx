import { NextPage } from 'next';
import {
  GetRoomsDocument,
  useCreateRoomMutation,
  useGetUserQuery,
  useMeQuery,
} from 'src/generated/graphql';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';
import transparent from '/public/transparent.png';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { Tabs } from 'src/components/user/Tabs';
import { Services } from 'src/components/user/Services';
import { Album } from 'src/components/user/Album';

import { Reviews } from 'src/components/user/Reviews';
import { ImagePopup } from 'src/components/utils/ImagePopup';
import { genderIcon } from 'src/utils/icons';
import useChatStore from 'src/store/ChatStore';

const UserDetail: NextPage<{ id: number }> = ({ id }) => {
  const { data: me } = useMeQuery();
  const { switchChatPopup, chatPopup, setChannel } = useChatStore();

  const [tabs, setTabs] = useState([
    { name: 'Services', icon: 'gamepad', current: true },
    { name: 'Album', icon: 'images', current: false },
    { name: 'Reviews', icon: 'star', current: false },
  ]);
  const [createRoom] = useCreateRoomMutation();
  const { data } = useGetUserQuery({
    variables: { id },
  });
  const user = data?.getUser;
  const images = data?.getUser?.images;
  const profileImage = images?.find((image) => image.type === 'profile')?.url;

  const socials = (icon: string, username: string) => (
    <div className='flex items-center'>
      <FontAwesomeIcon icon={['fab', icon as any]} className='mr-1' />
      {username}
    </div>
  );

  if (!data) {
    return null;
  }

  return (
    <Wrapper navbar className='dark:text-white text-black'>
      <div className='flex flex-col-reverse md:flex-row md:items-end md:justify-between mt-5'>
        <div className='flex items-start space-x-4'>
          <ImagePopup
            layout='fixed'
            objectFit='cover'
            width='250px'
            height='250px'
            className='rounded-xl'
            src={profileImage ?? transparent.src}
          />
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center space-x-2'>
              <h1 className='text-2xl font-bold'>{user?.username}</h1>
              <FontAwesomeIcon
                size='2x'
                className='text-dark dark:text-white'
                icon={genderIcon(user?.gender as string)}
              />
              <span
                className={`${
                  dayjs().diff(user?.lastOnline, 'minutes') < 120
                    ? 'bg-green-600'
                    : 'bg-gray-400'
                } h-4 w-4 rounded-full mr-1`}
              />
            </div>

            <div className='text-sm dark:text-gray-300 text-gray-600'>
              <p>Age: {user?.age && dayjs().diff(dayjs(user?.age), 'years')}</p>
              <p>
                Languages:{' '}
                {user?.languages &&
                  user.languages.map((lang) => lang.name).join(' / ')}
              </p>
              <p className='flex items-center space-x-1'>
                <span>Country:</span>
                {user?.country && (
                  <>
                    <span>{user.country.name}</span>
                    <img
                      src={`data:image/jpeg;base64,${user.country?.flag}`}
                      alt={user.country?.name}
                      title={user.country?.name}
                      className='h-2.5'
                    />
                  </>
                )}
              </p>
            </div>

            <div className='md:grid md:grid-cols-2 md:gap-x-5 text-sm'>
              {user?.discord && socials('discord', user.discord)}
              {user?.facebook && socials('facebook', user.facebook)}
              {user?.instagram && socials('instagram', user.instagram)}
              {user?.steam && socials('steam', user.steam)}
              {user?.twitter && socials('twitter', user.twitter)}
              {user?.snapchat && socials('snapchat', user.snapchat)}
              {user?.twitch && socials('twitch', user.twitch)}
              {user?.tiktok && socials('tiktok', user.tiktok)}
            </div>

            <p>{user?.description}</p>
          </div>
        </div>

        <div className='flex space-x-5 md:order-none justify-between md:justify-start mb-5'>
          {/* <button className='big-button'>follow</button> */}
          {me?.me && user && me.me?.id !== user.id && (
            <button
              className='big-button'
              onClick={async () => {
                const res = await createRoom({
                  variables: { participantId: user.id },
                  refetchQueries: [{ query: GetRoomsDocument }],
                });
                res.data?.createRoom && setChannel(res.data.createRoom);
                !chatPopup && switchChatPopup();
              }}
            >
              chat
            </button>
          )}
        </div>
      </div>
      <Tabs tabs={tabs} setTabs={setTabs} />
      {tabs.find(({ name, current }) => name === 'Services' && current) && (
        <Services data={data} />
      )}
      {tabs.find(({ name, current }) => name === 'Album' && current) && (
        <Album data={data} />
      )}
      {tabs.find(({ name, current }) => name === 'Reviews' && current) && (
        <Reviews data={data} />
      )}
    </Wrapper>
  );
};

UserDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(UserDetail);
