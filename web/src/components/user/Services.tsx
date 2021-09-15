import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';
import { GetUserQuery } from 'src/generated/graphql';
import { getRandomBetween } from 'src/utils';

import gray from '/public/gray.png';
import Image from 'next/image';

interface ServicesProps {
  data: GetUserQuery | undefined;
}

export const Services: React.FC<ServicesProps> = ({ data }) => {
  const router = useRouter();
  const services = data?.getUser?.services;
  return (
    <div>
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
