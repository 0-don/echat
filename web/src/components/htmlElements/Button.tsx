import React, { ButtonHTMLAttributes } from 'react';
import { Loading } from '../utils/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  text: string;
  icon?: string;
};

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  icon,
  text,
  ...props
}) => {
  return loading ? (
    <Loading />
  ) : (
    <button
      {...props}
      className='m-1 flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700'
    >
      {icon && <FontAwesomeIcon className='mr-1' icon={icon as any} />}
      
      {text}
    </button>
  );
};
