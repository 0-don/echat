import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import useFormStore from 'src/store/FormStore';

export const FormSteps: React.FC = () => {
  const { steps, setStep, hasHydrated } = useFormStore();

  return (
    <nav aria-label='Progress'>
      <ol className='border dark:bg-dark bg-white border-gray-300 dark:border-purple rounded-md divide-y divide-gray-300 md:flex md:divide-y-0'>
        {hasHydrated && steps.map(({ id, name, status }, index) => (
          <li key={index} className='relative md:flex-1 md:flex'>
            {status === 'complete' ? (
              <div
                onClick={() => setStep(index)}
                className='group flex items-center w-full'
              >
                <span className='px-6 py-4 flex items-center text-sm font-medium'>
                  <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple rounded-full group-hover:bg-purple'>
                    <CheckIcon
                      className='w-6 h-6 text-white'
                      aria-hidden='true'
                    />
                  </span>
                  <span className='ml-4 text-sm font-medium text-gray-900 dark:text-purple'>
                    {name}
                  </span>
                </span>
              </div>
            ) : status === 'current' ? (
              <div
                onClick={() => setStep(index)}
                className='px-6 py-4 flex items-center text-sm font-medium'
                aria-current='step'
              >
                <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-purple dark:bg-purple rounded-full'>
                  <span className='text-purple dark:text-gray-200'>{id}</span>
                </span>
                <span className='ml-4 text-sm font-medium text-gray-600 dark:text-gray-200'>
                  {name}
                </span>
              </div>
            ) : (
              <div
                onClick={() => setStep(index)}
                className='group flex items-center'
              >
                <span className='px-6 py-4 flex items-center text-sm font-medium'>
                  <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400 dark:group-hover:text-purple'>
                    <span className='text-gray-500 group-hover:text-gray-900 hover:text-puple  dark:group-hover:text-purple'>
                      {id}
                    </span>
                  </span>
                  <span className='ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:group-hover:text-purple'>
                    {name}
                  </span>
                </span>
              </div>
            )}

            {index !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className='hidden md:block absolute top-0 right-0 h-full w-5'
                  aria-hidden='true'
                >
                  <svg
                    className='h-full w-full text-gray-300 dark:text-purple'
                    viewBox='0 0 22 80'
                    fill='none'
                    preserveAspectRatio='none'
                  >
                    <path
                      d='M0 -2L20 40L0 82'
                      vectorEffect='non-scaling-stroke'
                      stroke='currentcolor'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};
