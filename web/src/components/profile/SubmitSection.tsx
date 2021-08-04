import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { StepType } from '../utils/FormSteps';

interface SubmitSectionProps {
  formikRef: React.RefObject<FormikProps<any>>;
  currentStep?: string;
  steps?: StepType[]
  setSteps?: Dispatch<SetStateAction<StepType[]>>
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({ formikRef }) => {
  formikRef;
  return (
    <>
      <div className='bg-white dark:bg-gray-800 dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
        <h1 className='text-gray-900 dark:text-white mb-3'>Submit</h1>
        <div className='flex flex-wrap'></div>
      </div>
    </>
  );
};
