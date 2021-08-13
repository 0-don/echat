import { FormikProps } from 'formik';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import { useChangeUserTypeMutation } from 'src/generated/graphql';
import { Button } from '../htmlElements';
import { StepType } from '../utils/FormSteps';
import { useRouter } from 'next/router';
import rocket from '/public/undraw_To_the_stars_qhyy.svg';

interface SubmitSectionProps {
  formikRef?: React.RefObject<FormikProps<any>>;
  currentStep?: string;
  steps?: StepType[];
  setSteps?: Dispatch<SetStateAction<StepType[]>>;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({ formikRef }) => {
  formikRef;
  const router = useRouter();
  const [changeUserType] = useChangeUserTypeMutation();
  return (
    <>
      <div className='bg-white text-center dark:bg-dark dark:text-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
        <div className='flex  justify-center'>
          <Image src={rocket} height={150} width={150} />
        </div>
        <h1 className='text-3xl my-2'>Ready to Go!!</h1>
        <p className='mb-4'>
          All Set! If you are happy with the contents of your profile and the
          games you've selected, proceed with submitting your application. We
          will be in touch with next steps. If you have any questions, please
          contact support.
        </p>
        <Button
          text='Submit Form'
          onClick={async () => {
            await changeUserType();
            router.push('/');
          }}
        />
      </div>
    </>
  );
};
