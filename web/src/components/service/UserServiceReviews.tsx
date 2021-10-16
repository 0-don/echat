// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import React from 'react';

import Image from 'next/image';
import gray from '/public/gray.png';
import dayjs from 'dayjs';
import { GetUserServiceQuery } from 'src/generated/graphql';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface UserServiceReviewsProps {
  data: GetUserServiceQuery | undefined;
}

export const UserServiceReviews: React.FC<UserServiceReviewsProps> = ({
  data,
}) => {
  const reviews = data?.getUserService?.reviews;
  const averageScore = reviews
    ? (
        reviews.reduce((total, next) => total + next.score, 0) / reviews.length
      ).toFixed(1)
    : '0.0';
  const served = reviews?.length ?? 0;

  return (
    <div className='mt-5'>
      <div className='flex justify-between items-end'>
        <h2 className='text-3xl'>Comment {served}</h2>
        <h5 className='text-xl'>{averageScore} Score</h5>
      </div>

      {reviews?.map(({ score, recommend, source, review, created_at }, index) => (
        <div key={index} className='bg-white dark:bg-dark dark:text-white shadow sm:rounded-lg p-3 px-5 my-5'>
          <div className='flex space-x-3'>
            <Image
              width={'40'}
              height={'40'}
              layout='fixed'
              objectFit='fill'
              className='rounded-full'
              src={
                source?.images?.find((image) => image.type === 'profile')
                  ?.url ?? gray.src
              }
            />
            <div className='flex flex-col'>
              <p className='text-xl'>{`${source?.username.charAt(
                0
              )}***${source?.username.charAt(source?.username.length - 1)}`}</p>
              <p className='text-gray-300'>{dayjs(created_at).toNow(true)}</p>
              <div className='flex items-center space-x-2'>
                <ReactStars
                  count={5}
                  value={1}
                  size={24}
                  isHalf={true}
                  readonly={true}
                  edit={false}
                  emptyIcon={<i className='far fa-star'></i>}
                  halfIcon={<i className='fa fa-star-half-alt'></i>}
                  fullIcon={<i className='fa fa-star'></i>}
                  activeColor='#eab308'
                />
                <p>{`${score.toFixed(1)} score | ${
                  recommend ? 'Recomended' : 'Not Recommended'
                }`}</p>
              </div>
              <p>{review}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
