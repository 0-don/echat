import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  GetUserGameDocument,
  useDeleteUserGameMutation,
  useGetUserGameQuery,
  useSwitchUserGameStatusMutation,
} from 'src/generated/graphql';
import { Button, ButtonField, SwitchField } from '../htmlElements';
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
      <GameModal />
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-1'>
        {data?.getUserGame?.map(
          ({ __typename, id, per, price, game, status, gameId }) => (
            <div
              key={game.boxArtUrl}
              className='bg-white w-full p-2 sm:p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none mx-1'
            >
              <img
                src={game.boxArtUrl}
                className='rounded-xl bg-gray-100 bg-center bg-cover'
              ></img>
              <div className='flex sm:flex-1 flex-col gap-2 p-1'>
                <h1 className='text-lg sm:text-xl font-semibold  text-gray-600'>
                  {game.name}
                </h1>
                <p className='text-gray-500 text-sm sm:text-base line-clamp-3'>
                  {price}€ per {per}
                </p>
                <div className='flex mt-auto items-center justify-center'>
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
                <div className='flex mt-auto'>
                  <Button
                    text='edit'
                    onClick={() => {
                      setGameId(game.id);
                      setGameOpen(!gameOpen);
                    }}
                  />
                  <Button
                    text='delete'
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
      <UpsertGameModal gameId={gameId} open={gameOpen} setOpen={setGameOpen} />
      {data?.getUserGame?.length ? (
        <ButtonField
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
      ) : null}
    </>
  );
};
