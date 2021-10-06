import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import { GetUserServiceQuery } from 'src/generated/graphql';
import { ImagePopup } from '../utils/ImagePopup';
import gray from '/public/gray.png';

interface UserServiceDetailProps {
  data: GetUserServiceQuery | undefined;
}

export const UserServiceDetail: React.FC<UserServiceDetailProps> = ({
  data,
}) => {
  const userService = data?.getUserService;
  const user = userService?.user;

  return (
    <>
      <div
        style={{ position: 'relative', width: '100%', height: '300px' }}
        className='mt-3 hidden md:block'
      >
        <ImagePopup
          layout='fill'
          objectFit='cover'
          className='rounded-lg'
          src={userService?.image ?? gray.src}
        />
      </div>
      <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 mt-5'>
        <div className='bg-white dark:bg-dark dark:text-white shadow rounded-lg p-3 px-5'>
          <div className='flex space-x-1 items-center'>
            <FontAwesomeIcon
              size='sm'
              className='text-dark dark:text-white group-hover:text-purple'
              icon={['fas', 'info-circle']}
            />
            <h5 className='text-bold'>Details:</h5>
          </div>

          <div className='flex justify-around py-1 space-x-5'>
            <div className='flex space-x-5 w-full'>
              <div className='font-bold'>Level</div>
              <div className=''>{userService?.level}</div>
            </div>

            <div className='flex space-x-5 w-full'>
              <div className='font-bold'>Platforms:</div>
              <div>
                {userService?.platforms
                  .map((platform: any) => platform.name)
                  .join(' / ')}
              </div>
            </div>
          </div>

          <div className='py-1'>
            <hr className='border-lightGray' />
          </div>
          <div className='font-bold'>Introduction</div>
          <p>{userService?.description}</p>
        </div>

        <div className='bg-white dark:bg-dark dark:text-white shadow rounded-lg pb-2 w-full md:w-96'>
          <div className='flex space-x-1 items-center px-5 p-3'>
            <FontAwesomeIcon
              size='sm'
              className='text-dark dark:text-white group-hover:text-purple'
              icon={['far', 'clock']}
            />
            <h5 className='text-bold'>Availability</h5>
          </div>
          <div className='flex flex-col'>
            {user?.schedules?.map((schedule, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 && 'bg-dark-light'
                } px-5 py-1 flex justify-between`}
              >
                <div>{schedule.name}</div>
                <div className='flex justify-between'>
                  <div>{dayjs(schedule.from).format('LT')}</div>
                  <div className='mx-1'>{'-'}</div>
                  <div className='text-right'>
                    {dayjs(schedule.to).format('LT')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
