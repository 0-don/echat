import { immer } from '../utils/immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export type StepType = {
  id: number;
  name: string;
  status: 'complete' | 'current' | 'upcoming';
};

type Form = {
  currentStep: string;
  steps: StepType[];
  setStep: (index: number) => void;
  formInit: (form: StepType[]) => void;
};

const useFormStore = create<Form>(
  persist(
    immer(
      (set): Form => ({
        currentStep: '',
        steps: [],
        setStep: (index) =>
          set((state) => {
            state.steps = state.steps.map((step) => {
              if (step.id < index) {
                step.status = 'complete';
              }
              if (step.id === index) {
                step.status = 'current';
                state.currentStep = step.name;
              }
              if (step.id > index) {
                step.status = 'upcoming';
              }
              return step;
            });
          }),
        formInit: (form) =>
          set((state) => {
            if (!state.steps.length) {
              state.steps = form;
            }
          }),
      })
    ),
    {
      name: 'Form',
      serialize: (state) => JSON.stringify(state),
      deserialize: (storedState) => JSON.parse(storedState),
    }
  )
);
export default useFormStore;
