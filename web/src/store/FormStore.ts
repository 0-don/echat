import { immer } from '../utils/immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export type StepType = {
  id: number;
  name: string;
  status: 'complete' | 'current' | 'upcoming';
};

type Form = {
  steps: StepType[];
  changeStep: (index: number) => void;
};

const useFormStore = create<Form>(
  persist(
    immer(
      (set): Form => ({
        steps: [],
        changeStep: (index) =>
          set((state) => {
            state.steps = state.steps.map((step) => {
              if (step.id < index) {
                step.status = 'complete';
              }
              if (step.id === index) {
                step.status = 'current';
              }
              if (step.id > index) {
                step.status = 'upcoming';
              }
              return step;
            });
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
