import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  GetUserGameDocument,
  useDeleteUserGameMutation,
  useGetUserGameQuery,
  useSwitchUserGameStatusMutation,
} from 'src/generated/graphql';
import { Button, SwitchField } from '../htmlElements';
import { Loading } from '../utils';
import { StepType } from '../utils/FormSteps';
import { GameModal } from './modals/GameModal';
import { UpsertGameModal } from './modals/UpsertGameModal';

interface GameSectionProps {
  formikRef?: React.RefObject<FormikProps<any>>;
  currentStep?: string;
  steps?: StepType[];
  setSteps?: Dispatch<SetStateAction<StepType[]>>;
}

export const GameSection: React.FC<GameSectionProps> = ({
  formikRef,
  currentStep,
  steps,
  setSteps,
}) => {
  const { data, loading } = useGetUserGameQuery();
  const [deleteUserGame] = useDeleteUserGameMutation();
  const [switchUserGameStatus] = useSwitchUserGameStatusMutation();
  const [gameOpen, setGameOpen] = useState(false);
  const [gameId, setGameId] = useState(0);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <UpsertGameModal gameId={gameId} open={gameOpen} setOpen={setGameOpen} />
      <div className='flex justify-end my-3 '>
        <GameModal />
      </div>
      <div className='grid  grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
        {data?.getUserGame?.map(
          ({ __typename, id, per, price, game, status, gameId }) => (
            <div
              key={game.boxArtUrl}
              className='bg-white dark:bg-dark dark:text-white flex flex-col select-none mx-1 rounded-xl'
            >
              <h1 className='text-base my-1 font-semibold text-center text-black dark:text-white'>
                {game.name}
              </h1>
              <img src={game.boxArtUrl} className='h-auto' />
              <div className='flex sm:flex-1 flex-col gap-2 p-1 '>
                <div className='flex mt-auto items-center justify-between text-sm'>
                  <div className='flex items-center justify-center'>
                    <SwitchField
                      checked={status}
                      onChange={async () => {
                        await switchUserGameStatus({
                          variables: { id },
                          refetchQueries: [{ query: GetUserGameDocument }],
                        });
                      }}
                    />
                    Status
                  </div>
                  <p className='text-black dark:text-white text-center'>
                    <span className='text-green-500'>${price}</span> per {per}
                  </p>
                </div>

                <div className='flex justify-between mt-auto'>
                  <Button
                    text='edit'
                    className='py-1'
                    icon='pen-alt'
                    onClick={() => {
                      setGameId(game.id);
                      setGameOpen(!gameOpen);
                    }}
                  />
                  <Button
                    text='delete'
                    className='py-1'
                    icon='trash-alt'
                    onClick={async () => {
                      await deleteUserGame({
                        variables: { id },
                        update(c) {
                          const normalizedId = c.identify({ id, __typename });
                          c.evict({ id: normalizedId });
                          c.gc();
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className='flex justify-end text-white dark:text-dark-dark'>
        {data?.getUserGame?.length && (
          <Button
            text='Next'
            type='button'
            onClick={() => {
              if (steps && setSteps) {
                const findIndex = steps.findIndex(
                  (step) => step.name === currentStep
                );
                setSteps(
                  steps.map((step) => {
                    if (step.id < findIndex + 1) {
                      step.status = 'complete';
                    }
                    if (step.id === findIndex + 1) {
                      step.status = 'current';
                    }
                    if (step.id > findIndex + 1) {
                      step.status = 'upcoming';
                    }
                    return step;
                  })
                );
              }
            }}
          />
        )}
      </div>
    </>
  );
};
