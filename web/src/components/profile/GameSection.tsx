import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useGetUserGameQuery } from 'src/generated/graphql';
import { StepType } from '../utils/FormSteps';
import { GameModal } from './modals/GameModal';

interface GameSectionProps {
  formikRef: React.RefObject<FormikProps<any>>;
  currentStep?: string;
  steps?: StepType[];
  setSteps?: Dispatch<SetStateAction<StepType[]>>;
}

export const GameSection: React.FC<GameSectionProps> = ({}) => {
  const { data, loading } = useGetUserGameQuery();

  if (!loading) {
    console.log(data)
  }

  return (
    <>
      <GameModal />
    </>
  );
};
