import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';
import { GetUserQuery } from 'src/generated/graphql';
import { getRandomBetween } from 'src/utils';
import gray from '/public/gray.png';
import Image from 'next/image';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ServicesProps {
  data: GetUserQuery | undefined;
  rating: number;
}

export const Services: React.FC<ServicesProps> = ({ data, rating }) => {
  const router = useRouter();
  const services = data?.getUser?.services;

  const ratingStar = (star: number) => (
    <FontAwesomeIcon
      size='2x'
      className={`${rating > star ? 'text-yellow-500' : 'text-dark-light'}`}
      icon={
        `${
          rating > star && rating < star + 1 ? 'star-half-alt' : 'star'
        }` as IconProp
      }
    />
  );

  return (
    <div>
      <div className='bg-white dark:bg-dark dark:text-white shadow sm:rounded-lg p-3 px-5 my-5'>
        <div className='flex flex-col md:flex-row  items-center'>
          <div className='flex flex-col space-x-1'>
            <h3 className='font-medium'>Average Score</h3>
            <div className='flex items-end space-x-2.5'>
              <p>
                <span className='text-5xl'>{rating.toFixed(1)}</span>
                <span className='text-4xl'>/</span>
                <span className='text-3xl'>5.0</span>
              </p>
              <div className='flex space-x-1 mb-0.5'>
                {ratingStar(0)}
                {ratingStar(1)}
                {ratingStar(2)}
                {ratingStar(3)}
                {ratingStar(4)}
              </div>
            </div>
          </div>

          <div className='flex mt-3 md:mt-0'>
            <div className='md:border-r border-gray-500 md:ml-10 md:mr-3'></div>

            <div>
              <h3 className='font-medium'>Served</h3>
              <p className='text-5xl'>{getRandomBetween(0, 200)}</p>
            </div>

            <div className='border-r border-gray-500 ml-3 md:ml-10 mr-3'></div>

            <div>
              <h3 className='font-medium'>Recomended</h3>
              <p className='text-5xl'>{getRandomBetween(0, 200)}</p>
            </div>
          </div>

          <div className='md:h-16 border-r border-gray-500 ml-3 md:ml-10 mr-3'></div>

          <div className='flex flex-wrap justify-center md:justify-start mt-2 md:mt-0'>
            <p className='rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2 mr-4'>
              Fast Response (12)
            </p>
            <p className='rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2 mr-4'>
              Interactive (8)
            </p>
            <p className='rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2 mr-4'>
              Humorous (13)
            </p>
            <p className='rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2 mr-4'>
              Carry in Game (2)
            </p>
            <p className='rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2 mr-4'>
              Turn the Tide (3)
            </p>
            <p className='rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2 mr-4'>
              Cooperative (75)
            </p>
            <p className='rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2 mr-4'>
              Creative (12)
            </p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white text-base mt-5'>
        {services?.map(({ price, per, id, service }) => (
          <div
            key={id}
            className='bg-white dark:bg-dark flex flex-col'
            onClick={() => router.push(`/service/${id}`)}
          >
            <div
              style={{ position: 'relative', width: '100%', height: '200px' }}
            >
              <Image
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
                layout='fill'
                objectFit='cover'
                src={service.boxArtUrl ?? gray.src}
              />
            </div>
            <div className='p-2'>
              <div className='flex items-center justify-between w-full'>
                <h1 className='text-base my-1 font-semibold text-center text-black dark:text-white'>
                  {service.name}
                </h1>
              </div>
              <div className='flex  items-center divide-x-2 divide-y-8 '>
                <FontAwesomeIcon
                  size='xs'
                  className='dark:text-yellow-500 text-black mr-1'
                  icon='star'
                />
                {`${getRandomBetween(3, 5)}.${getRandomBetween(
                  10,
                  99
                )} (${getRandomBetween(0, 200)})`}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
