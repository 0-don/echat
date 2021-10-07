import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';
import { FilterUserServiceQuery } from 'src/generated/graphql';
import { Button } from '../htmlElements';
import gray from '/public/gray.png';
import Image from 'next/image';

interface UserServicesProps {
  data: FilterUserServiceQuery | undefined;
}

export const UserServices: React.FC<UserServicesProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-black dark:text-white text-base'>
      {data?.filterUserService?.userService.map(
        ({ user, price, per, id, reviews }, index) => (
          <div key={index} className='bg-white dark:bg-dark flex flex-col'>
            <div
              style={{ position: 'relative', width: '100%', height: '200px' }}
              onClick={() => router.push(`/user/${user.id}`)}
            >
              <Image
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
                layout='fill'
                objectFit='cover'
                src={user.images?.length ? user.images[0].url : gray.src}
              />
            </div>
            <div className='p-2'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center'>
                  <span
                    className={`${
                      index % 2 == 0 ? 'bg-green-500' : 'bg-gray-500'
                    } h-4 w-4 rounded-full mr-1`}
                  />
                  <h1 className='text-base my-1 font-semibold text-center '>
                    {user.username}
                  </h1>
                </div>

                <img
                  src={`data:image/jpeg;base64,${user.country?.flag}`}
                  alt={user.country?.name}
                  title={user.country?.name}
                  className='h-4'
                />
              </div>
              <div className='flex  items-center divide-x-2 divide-y-8 '>
                <FontAwesomeIcon
                  size='xs'
                  className='dark:text-yellow-500 text-yellow-500 mr-1'
                  icon='star'
                />

                {`${
                  reviews && reviews?.length
                    ? (
                        reviews.reduce((total, next) => total + next.score, 0) /
                        reviews.length
                      ).toFixed(1)
                    : '0.0'
                } (${reviews ? reviews?.length : 0})`}
              </div>
              <hr className='border-lightGray my-1' />
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FontAwesomeIcon
                    size='xs'
                    className='dark:text-white text-black mr-1'
                    icon='coins'
                  />
                  <div className='font-bold '>{`${price.toFixed(
                    2
                  )} / ${per}`}</div>
                </div>
                {/* {user.age && new Date().getFullYear() - new Date(user.age).getFullYear()} */}
                {/* <Button
                  text={`View`}
                  className='p-1 m-1'
                  onClick={() => router.push(`/service/${id}`)}
                /> */}
                <Button
                  text={`Order`}
                  className='p-1 m-1'
                  onClick={() => router.push(`/service/${id}`)}
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
