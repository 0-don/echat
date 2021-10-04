// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';
import { GetUserQuery } from 'src/generated/graphql';

import gray from '/public/gray.png';
import Image from 'next/image';

interface ServicesProps {
  data: GetUserQuery | undefined;
}

//          /"\
//         |\./|
//         |   |
//         |   |
//         |>~<|
//         |   |
//      /'\|   |/'\..
//  /~\|   |   |   | \
// |   =[@]=   |   |  \
// |   |   |   |   |   \
// | ~   ~   ~   ~ |`   )
// |                   /
//  \                 /
//   \               /
//    \    _____    /
//     |--//''`\--|
//     | (( +==)) |
//     |--\_|_//--|

export const Services: React.FC<ServicesProps> = ({ data }) => {
  const router = useRouter();

  const services = data?.getUser?.services;
  const reviews = data?.getUser?.target;

  const averageScore = reviews?.length
    ? (
        reviews.reduce((total, next) => total + next.score, 0) / reviews.length
      ).toFixed(1)
    : '0.0';
  const served = reviews?.length ?? 0;
  const recommend = reviews?.filter((review) => review.recommend).length ?? 0;

  return (
    <div>
      <div className='bg-white dark:bg-dark dark:text-white shadow sm:rounded-lg p-3 px-5 my-5'>
        <div className='flex flex-col md:flex-row  items-center'>
          <div className='flex flex-col space-x-1'>
            <h3 className='font-medium'>Average Score</h3>
            <div className='flex items-center space-x-2.5 w-full'>
              <p>
                <span className='text-5xl'>{averageScore}</span>
                <span className='text-4xl'>/</span>
                <span className='text-3xl'>5.0</span>
              </p>
              <div className='flex space-x-1 mb-0.5 w-full'>
                <ReactStars
                  count={5}
                  value={Number(averageScore)}
                  size={36}
                  isHalf={true}
                  readonly={true}
                  edit={false}
                  emptyIcon={<i className='far fa-star'></i>}
                  halfIcon={<i className='fa fa-star-half-alt'></i>}
                  fullIcon={<i className='fa fa-star'></i>}
                  activeColor='#eab308'
                />
              </div>
            </div>
          </div>

          <div className='flex mt-3 md:mt-0'>
            <div className='md:border-r border-gray-500 md:ml-10 md:mr-3'></div>

            <div>
              <h3 className='font-medium'>Served</h3>
              <p className='text-5xl'>{served}</p>
            </div>

            <div className='border-r border-gray-500 ml-3 md:ml-10 mr-3'></div>

            <div>
              <h3 className='font-medium'>Recomended</h3>
              <p className='text-5xl'>{recommend}</p>
            </div>
          </div>

          <div className='md:h-16 border-r border-gray-500 ml-3 md:ml-10 mr-3'></div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white text-base mt-5'>
        {services?.map(({ price, per, id, service, reviews }) => (
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
