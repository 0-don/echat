import React from 'react';

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <>
      <div className='flex items-center flex-col'>
        <div className='loader-dots block relative w-20 mt-2'>
          <div className='absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-600'></div>
          <div className='absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-600'></div>
          <div className='absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-600'></div>
          <div className='absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-600'></div>
        </div>
      </div>
    </>
  );
};
