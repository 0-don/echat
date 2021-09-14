import { NextPage } from 'next';
import { useGetUserQuery } from 'src/generated/graphql';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';
import Image from 'next/image';
import transparent from '/public/transparent.png';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';

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
  console.log(user?.lastOnline);
  console.log(user?.lastOnline && new Date(user.lastOnline).getTime());
  // console.log(user?.lastOnline && new Date(user?.lastOnline).getTime() % 2);
  return (
    <Wrapper navbar fluid className='dark:text-white text-black relative'>
      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-0 left-0 right-0 mt-5'>
        <div className='flex items-start space-x-4'>
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center space-x-2'>
              <h1 className='text-3xl font-bold'>{user?.username}</h1>
              <FontAwesomeIcon
                size='2x'
                className='text-dark dark:text-white '
                icon={genderIcon(user?.gender as string)}
              />
              <span
                className={`${
                  user?.lastOnline && new Date(user.lastOnline).getTime()
                    ? 'bg-green-500'
                    : 'bg-gray-500'
                } h-4 w-4 rounded-full mr-1`}
              />
            </div>
            <div className='text-sm dark:text-gray-300 text-gray-600'>
              <p>
                Age:{' '}
                {user?.age && dayjs(new Date()).diff(dayjs(user?.age), 'years')}
              </p>
              <p>
                Languages:{' '}
                {user?.languages &&
                  user.languages.map((lang) => lang.name).join('/')}
              </p>
            </div>
            <div className='text-sm dark:text-gray-300 text-gray-600'>
              <p>
                Age:{' '}
                {user?.age && dayjs(new Date()).diff(dayjs(user?.age), 'years')}
              </p>
              <p>
                Languages:{' '}
                {user?.languages &&
                  user.languages.map((lang) => lang.name).join('/')}
              </p>
            </div>
          </div>

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
        </div>
      </div>
    </Wrapper>
  );
};

UserDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(UserDetail);
