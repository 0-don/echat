import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  brandIcon?: string;
  icon?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  brandIcon,
  icon,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <>
      <label
        htmlFor={field.name}
        className='block my-1 text-sm font-medium text-gray-700 dark:text-gray-200'
      >
        {label}
      </label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='text-gray-700 dark:text-white absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          {icon && <FontAwesomeIcon icon={icon as any} />}
          {brandIcon && <FontAwesomeIcon icon={['fab', brandIcon as any]} />}
        </div>
        <input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
          className={`
          ${error ? 'border-red-500' : 'border-gray-300'} 
          ${icon || brandIcon && 'pl-8'} 
           text-white appearance-none block w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          `}
        />
      </div>
      {error && (
        <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
          {error}
        </span>
      )}
    </>
  );
};
