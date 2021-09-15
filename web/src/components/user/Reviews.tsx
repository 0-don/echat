import React from 'react';
import { GetUserQuery } from 'src/generated/graphql';
import { getRandomBetween } from 'src/utils';

interface ReviewsProps {
  data: GetUserQuery | undefined;
  rating: number;
}

export const Reviews: React.FC<ReviewsProps> = ({ data, rating }) => {
  data;
  return (
    <div className='mt-5'>
      <div className='flex justify-between items-end'>
        <h2 className='text-3xl'>Comment {getRandomBetween(3, 40)}</h2>
        <h5 className='text-xl'>{rating.toFixed(1)} Score</h5>
      </div>
    </div>
  );
};
