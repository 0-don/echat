import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  useDeleteUserGameMutation,
  useGetUserGameQuery,
} from 'src/generated/graphql';
import { Loading } from '../utils';
import { StepType } from '../utils/FormSteps';
import { GameModal } from './modals/GameModal';
import { UpsertGameModal } from './modals/UpsertGameModal';

interface GameSectionProps {
  formikRef: React.RefObject<FormikProps<any>>;
  currentStep?: string;
  steps?: StepType[];
  setSteps?: Dispatch<SetStateAction<StepType[]>>;
}

export const GameSection: React.FC<GameSectionProps> = ({}) => {
  const { data, loading } = useGetUserGameQuery();
  const [deleteUserGame] = useDeleteUserGameMutation();
  const [gameOpen, setGameOpen] = useState(false);
  const [gameId, setGameId] = useState(0);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <GameModal />
      <ul
        role='list'
        className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 '
      >
        {data?.getUserGame?.map(({ __typename, id, per, price, game }) => (
          <li
            key={id}
            onClick={() => {}}
            className='col-span-1 text-black dark:text-white flex flex-col text-center divide-y m-2'
          >
            <div className='flex-1 flex flex-col'>
              <img
                className='flex-shrink-0 mx-auto '
                src={game.boxArtUrl}
                alt=''
              />
              <h3 className='mt-6 text-sm font-medium'>{game.name}</h3>
            </div>

            <button
              onClick={async () => {
                await deleteUserGame({
                  variables: { id },
                  update(cache, { data }) {
                    const normalizedId = cache.identify({
                      id,
                      __typename,
                    });

                    cache.evict({ id: normalizedId });
                    cache.gc();
                  },
                });
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                setGameId(game.id);
                setGameOpen(!gameOpen);
              }}
            >
              edit
            </button>
          </li>
        ))}
      </ul>
      <UpsertGameModal gameId={gameId} open={gameOpen} setOpen={setGameOpen} />
    </>
  );
};
