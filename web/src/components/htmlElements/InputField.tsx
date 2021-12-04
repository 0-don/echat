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
        className='block my-1 text-sm font-medium text-gray-700 dark:text-gray-50'
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
          ${brandIcon && 'pl-8'}
          ${icon && 'pl-6'} 
            appearance-none block w-full px-3 py-2 dark:bg-dark-light dark:border-dark-light dark:text-white border rounded-md shadow-sm focus:outline-none 
            dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple focus:border-purple sm:text-sm focus:border-purple'
          `}
        />
      </div>
      {error && (
        <span className='flex text- items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>
          {error}
        </span>
      )}
    </>
  );
};
