import React, { ButtonHTMLAttributes } from 'react';
import { Loading } from '../utils/Loading';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  text: string;
};

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  text,
  ...props
}) => {

  return loading ? (
    <Loading />
  ) : (
    <button
      {...props}
      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    >
      {text}
    </button>
  );
};
