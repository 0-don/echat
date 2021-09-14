import { NextPage } from 'next';
import { useGetUserQuery } from 'src/generated/graphql';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';
import Image from 'next/image';
import transparent from '/public/transparent.png';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { Button } from 'src/components/htmlElements';

const genderIcon = (gender: string | undefined) => {
  switch (gender) {
    case 'Male':
      return 'mars';
    case 'Female':
      return 'venus';
    case 'Other':
      return 'transgender';
    default:
      return 'star';
  }
};

const UserDetail: NextPage<{ id: number }> = ({ id }) => {
  const { data } = useGetUserQuery({
    variables: { id },
  });
  const user = data?.getUser;
  const images = data?.getUser?.images;
  const profileImage = images?.find((image) => image.type === 'profile')?.url;
  console.log(profileImage);

  const socials = (icon: string, username: string) => (
    <div className='flex items-center'>
      <FontAwesomeIcon icon={['fab', icon as any]} className='mr-1' />
      {username}
    </div>
  );

  return (
    <Wrapper navbar fluid className='dark:text-white text-black relative'>
      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-0 left-0 right-0 mt-5 '>
        <div className='flex flex-col-reverse md:flex-row md:items-end md:justify-between'>
          <div className='flex items-start space-x-4'>
            <div
              style={{ position: 'relative', width: '250px', height: '250px' }}
            >
              <Image
                layout='fill'
                objectFit='cover'
                className='rounded-xl'
                src={profileImage ?? transparent.src}
              />
            </div>

            <div className='flex flex-col space-y-2 max-w-xs'>
              <div className='flex items-center space-x-2'>
                <h1 className='text-2xl font-bold'>{user?.username}</h1>
                <FontAwesomeIcon
                  size='2x'
                  className='text-dark dark:text-white '
                  icon={genderIcon(user?.gender as string)}
                />
                <span
                  className={`${
                    user?.lastOnline &&
                    new Date(user.lastOnline).getTime() % 2 === 0
                      ? 'bg-green-500'
                      : 'bg-gray-500'
                  } h-4 w-4 rounded-full mr-1`}
                />
              </div>

              <div className='text-sm dark:text-gray-300 text-gray-600'>
                <p>
                  Age:{' '}
                  {user?.age &&
                    dayjs(new Date()).diff(dayjs(user?.age), 'years')}
                </p>
                <p>
                  Languages:{' '}
                  {user?.languages &&
                    user.languages.map((lang) => lang.name).join(' / ')}
                </p>
              </div>

              <div className='grid grid-cols-2 text-sm'>
                {user?.discord && socials('discord', user.discord)}
                {user?.facebook && socials('facebook', user.facebook)}
                {user?.instagram && socials('instagram', user.instagram)}
                {user?.steam && socials('steam', user.steam)}
                {user?.twitter && socials('twitter', user.twitter)}
                {user?.snapchat && socials('snapchat', user.snapchat)}
                {user?.twitch && socials('twitch', user.twitch)}
                {user?.tiktok && socials('tiktok', user.tiktok)}
              </div>

              <div className=''>{user?.description}</div>
            </div>
          </div>

          <div className='flex space-x-5 md:order-none justify-between md:justify-start mb-5'>
            <Button text='follow' className='h-13 w-28 rounded-3xl text-xl' />
            <Button text='chat' className='h-13 w-28 rounded-3xl text-xl' />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

UserDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(UserDetail);
