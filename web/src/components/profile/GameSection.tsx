import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { StepType } from '../utils/FormSteps';
import { GameModal } from './modals/GameModal';

interface GameSectionProps {
  formikRef: React.RefObject<FormikProps<any>>;
  currentStep?: string;
  steps?: StepType[];
  setSteps?: Dispatch<SetStateAction<StepType[]>>;
}

export const GameSection: React.FC<GameSectionProps> = ({ formikRef }) => {
  formikRef;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <GameModal open={open} setOpen={setOpen} />
      <button onClick={() => setOpen(!open)}>textz</button>
    </>
  );
};
