import { useField } from 'formik';
import React, { TextareaHTMLAttributes } from 'react';

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
    <div>
      <label
        htmlFor={field.name}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1'>
        <textarea
          {...field}
          // {...props}
          id={field.name}
          placeholder={props.placeholder}
          className={`
          ${error ? 'border-red-500' : 'border-gray-300'} 
           text-gray-700 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          `}
        />
      </div>
      {error ? (
        <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
          {error}
        </span>
      ) : null}
    </div>
  );
};
