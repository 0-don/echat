import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/solid';
import { FieldError } from 'src/generated/graphql';

interface AlertProps {
  timeout?: number;
  errors: FieldError[];
  setErrors: Dispatch<SetStateAction<FieldError[] | undefined>>;
}

export const Alert: React.FC<AlertProps> = ({
  timeout = 5000,
  errors,
  setErrors,
}) => {
  let timeoutId: NodeJS.Timeout | null = null;
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    timeoutId = setTimeout(() => {
      setIsShown(false);
      setErrors([]);
    }, timeout);
    return () => {
      timeoutId && clearTimeout(timeoutId);
      setErrors([]);
    };
  }, [timeout, timeoutId]);

  return (
    <>
      {isShown && (
        <div className='rounded-md bg-red-50 p-4 mb-5'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon
                className='h-5 w-5 text-red-400'
                aria-hidden='true'
              />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>
                There were {errors.length} errors with your submission
              </h3>
              <div className='mt-2 text-sm text-red-700'>
                <ul role='list' className='list-disc pl-5 space-y-1'>
                  {errors.map(({ message }) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
