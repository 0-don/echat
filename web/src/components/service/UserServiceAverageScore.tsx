// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import React from 'react';
import { GetUserServiceQuery } from 'src/generated/graphql';


interface UserServiceAverageScoreProps {
  data: GetUserServiceQuery | undefined;
}

export const UserServiceAverageScore: React.FC<UserServiceAverageScoreProps> = ({ data }) => {

  const reviews = data?.getUserService?.user.target;

  const averageScore = reviews?.length
    ? (
        reviews.reduce((total, next) => total + next.score, 0) / reviews.length
      ).toFixed(1)
    : '0.0';
  const served = reviews?.length ?? 0;
  const recommend = reviews?.filter((review) => review.recommend).length ?? 0;

  return (
    <div className='w-full mt-5 md:mt-0'>
      <div className='bg-white dark:bg-dark dark:text-white shadow rounded-lg p-3 px-5'>
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
    </div>
  );
};
