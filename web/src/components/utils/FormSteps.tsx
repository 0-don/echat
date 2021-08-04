import React, { Dispatch, SetStateAction } from 'react';
import { CheckIcon } from '@heroicons/react/solid';

interface FormStepsProps {
  steps: StepType[]
  setSteps: Dispatch<SetStateAction<StepType[]>>
}

export type StepType = {
  id: number;
  name: string;
  status: 'complete' | 'current' | 'upcoming';
};

export const FormSteps: React.FC<FormStepsProps> = ({steps, setSteps}) => {

  const changeStep = (stepIdx: number) => {
    setSteps(
      steps.map((step) => {
        if (step.id < stepIdx) {
          step.status = 'complete';
        }
        if (step.id === stepIdx) {
          step.status = 'current';
        }
        if (step.id > stepIdx) {
          step.status = 'upcoming';
        }
        return step;
      })
    );
  };

  return (
    <nav aria-label='Progress'>
      <ol className='border mb-5 dark:bg-gray-800 bg-white border-gray-300 dark:border-indigo-500 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0'>
        {steps.map((step, stepIdx) => (
          <li key={step.name} className='relative md:flex-1 md:flex'>
            {step.status === 'complete' ? (
              <div
                onClick={() => changeStep(stepIdx)}
                className='group flex items-center w-full'
              >
                <span className='px-6 py-4 flex items-center text-sm font-medium'>
                  <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800'>
                    <CheckIcon
                      className='w-6 h-6 text-white'
                      aria-hidden='true'
                    />
                  </span>
                  <span className='ml-4 text-sm font-medium text-gray-900 dark:text-indigo-500'>
                    {step.name}
                  </span>
                </span>
              </div>
            ) : step.status === 'current' ? (
              <div
                onClick={() => changeStep(stepIdx)}
                className='px-6 py-4 flex items-center text-sm font-medium'
                aria-current='step'
              >
                <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 dark:bg-indigo-600 rounded-full'>
                  <span className='text-indigo-600 dark:text-gray-200'>
                    {step.id}
                  </span>
                </span>
                <span className='ml-4 text-sm font-medium text-gray-600 dark:text-gray-200'>
                  {step.name}
                </span>
              </div>
            ) : (
              <div
                onClick={() => changeStep(stepIdx)}
                className='group flex items-center'
              >
                <span className='px-6 py-4 flex items-center text-sm font-medium'>
                  <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400 dark:group-hover:text-indigo-600'>
                    <span className='text-gray-500 group-hover:text-gray-900 dark:group-hover:text-indigo-600'>
                      {step.id}
                    </span>
                  </span>
                  <span className='ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:group-hover:text-indigo-600'>
                    {step.name}
                  </span>
                </span>
              </div>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className='hidden md:block absolute top-0 right-0 h-full w-5'
                  aria-hidden='true'
                >
                  <svg
                    className='h-full w-full text-gray-300 dark:text-indigo-500'
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
