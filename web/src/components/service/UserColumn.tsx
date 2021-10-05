import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import router from 'next/router';
import React from 'react';
import { GetUserServiceQuery } from 'src/generated/graphql';
import { ImagePopup } from '../utils/ImagePopup';
import gray from '/public/gray.png';
import Image from 'next/image';
import { genderIcon } from 'src/utils/icons';

interface UserColumnProps {
  data: GetUserServiceQuery | undefined;
}

export const UserColumn: React.FC<UserColumnProps> = ({ data }) => {
  const user = data?.getUserService?.user;
  const userServices = data?.getUserService?.user?.services;
  const profileImage = user?.images?.find(
    (image) => image.type === 'profile'
  )?.url;

  return (
    <div className='flex flex-col bg-white dark:bg-dark w-full md:w-5/12 rounded-lg'>
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <ImagePopup
          layout='fill'
          objectFit='cover'
          className='rounded-t-lg'
          src={profileImage ?? gray.src}
        />
      </div>
      <div className='p-5 flex flex-col space-y-2'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center space-x-3'>
            <h1
              className='text-2xl font-semibold hover:text-purple cursor-pointer'
              onClick={() => router.push(`/user/${user?.id}`)}
            >
              {user?.username}
            </h1>
            <FontAwesomeIcon
              size='2x'
              className='text-dark dark:text-white'
              icon={genderIcon(user?.gender as string)}
            />
          </div>
          <span
            className={`${
              user?.lastOnline && new Date(user.lastOnline).getTime() % 2 === 0
                ? 'bg-green-500'
                : 'bg-gray-500'
            } h-4 w-4 rounded-full mr-1`}
          />
        </div>
        <div className='flex flex-col text-sm text-gray-300 space-y-1'>
          <p>
            Languages: {user?.languages?.map((lang) => lang.name).join(' / ')}
          </p>
          <p>Age: {dayjs(new Date()).diff(dayjs(user?.age), 'years')}</p>
        </div>

        <div className='w-full justify-end flex'>
          <div
            className='group flex space-x-1 cursor-pointer items-center'
            onClick={() => router.push(`/user/${user?.id}`)}
          >
            <p className='group-hover:text-purple text-sm font-medium'>
              Profile
            </p>
            <FontAwesomeIcon
              size='sm'
              className='text-dark dark:text-white group-hover:text-purple'
              icon={['fas', 'angle-right']}
            />
          </div>
        </div>

        <div className='py-1'>
          <hr className='border-lightGray' />
        </div>

        <h5>Other Games</h5>
        <div className='flex flex-wrap'>
          {/* <div className='grid grid-flow-row gap-6 mt-5'> */}
          {userServices?.map((userService, index) => (
            <div
              className='my-0.5 mx-1 cursor-pointer'
              key={index}
              onClick={() => router.push(`/service/${userService.id}`)}
            >
              <Image
                width={75.2}
                height={100}
                layout='fixed'
                objectFit='cover'
                className='transition duration-200 ease-in-out hover:transform hover:translate-y-1'
                src={userService?.service?.boxArtUrl ?? gray.src}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
