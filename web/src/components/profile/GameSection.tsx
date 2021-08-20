import { FormikProps } from 'formik';
import React, { useState } from 'react';
import {
  GetUserGameDocument,
  useDeleteUserGameMutation,
  useGetUserGameQuery,
  useSwitchUserGameStatusMutation,
} from 'src/generated/graphql';
import useFormStore from 'src/store/FormStore';
import { Button, SwitchField } from '../htmlElements';
import { Loading } from '../utils';
import { GameModal } from './modals/GameModal';
import { UpsertGameModal } from './modals/UpsertGameModal';

interface GameSectionProps {
  formikRef?: React.RefObject<FormikProps<any>>;
}

export const GameSection: React.FC<GameSectionProps> = ({ formikRef }) => {
  formikRef;
  const { setStep } = useFormStore();
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
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {data?.getUserGame?.map(
          ({ __typename, id, per, price, game, status, gameId }) => (
            <div
              key={game.boxArtUrl}
              className='bg-white dark:bg-dark dark:text-white flex flex-col select-none mx-1'
            >
              <h1 className='font-semibold py-1 text-center text-black dark:text-white'>
                {game.name}
              </h1>
              <div className='relative'>
                <img
                  src={game.boxArtUrl}
                  className={`w-full ${!status && 'opacity-50'}`}
                />
                <div className='absolute top-0 right-0 bg-dark rounded-full mt-0.5 mr-0.5'>
                  <SwitchField
                    checked={status}
                    onChange={async () => {
                      await switchUserGameStatus({
                        variables: { id },
                        refetchQueries: [{ query: GetUserGameDocument }],
                      });
                    }}
                  />
                </div>
              </div>

              <div className='flex sm:flex-1 flex-col gap-2'>
                <p className='text-black dark:text-white text-center mt-1'>
                  <span className='text-green-500'>${price}</span> per {per}
                </p>

                <div className='flex justify-between mt-auto'>
                  <Button
                    text='edit'
                    className='py-1 w-6/12 rounded-none'
                    icon='pen-alt'
                    onClick={() => {
                      setGameId(game.id);
                      setGameOpen(!gameOpen);
                    }}
                  />
                  <Button
                    text='delete'
                    className='py-1 w-6/12 rounded-none'
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
            text='next'
            type='button'
            icon='caret-right'
            onClick={() => setStep(2)}
          />
        )}
      </div>
    </>
  );
};
