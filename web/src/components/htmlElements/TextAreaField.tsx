import { useField } from 'formik';
import React, {  TextareaHTMLAttributes } from 'react';

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <>
      <label
        htmlFor={field.name}
        className='block my-1 text-sm font-medium text-gray-900 dark:text-gray-50'
      >
        {label}
      </label>
      <div className='mt-1'>
        <textarea
          {...field}
          id={field.name}
          placeholder={props.placeholder}
          className={`
          ${error ? 'border-red-500' : 'border-gray-300'} 
          text-white appearance-none block w-full px-3 py-2 resize-none  border rounded-md shadow-sm placeholder-gray-400 focus:outline-none   dark:bg-dark-light dark:border-dark-light  dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple sm:text-sm focus:border-purple'
          `}
        />
      </div>
      {error ? (
        <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
          {error}
        </span>
      ) : null}
    </>
  );
};
