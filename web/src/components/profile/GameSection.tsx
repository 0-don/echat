import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  useDeleteUserGameMutation,
  useGetUserGameQuery,
} from 'src/generated/graphql';
import { ButtonField } from '../htmlElements';
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
  const [gameOpen, setGameOpen] = useState(false);
  const [gameId, setGameId] = useState(0);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <GameModal />

      {data?.getUserGame?.map(({ __typename, id, per, price, game }) => (
        <div className='flex'>
          <div className='flex-none w-48 relative'>
            <img
              src='https://tailwindcss.com/_next/static/media/classic-utility-jacket.0f108046e151c8576017eaf383406fe6.jpg'
              alt=''
              className='absolute inset-0 w-full h-full object-cover'
            />
          </div>
          <form className='flex-auto p-6'>
            <div className='flex flex-wrap'>
              <h1 className='flex-auto text-xl font-semibold'>
                Classic Utility Jacket
              </h1>
              <div className='text-xl font-semibold text-gray-500'>$110.00</div>
              <div className='w-full flex-none text-sm font-medium text-gray-500 mt-2'>
                In stock
              </div>
            </div>
            <div className='flex items-baseline mt-4 mb-6'>
              <div className='space-x-2 flex'>
                <label>
                  <input
                    className='w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg'
                    name='size'
                    type='radio'
                    value='xs'
                    checked
                  />
                  XS
                </label>
                <label>
                  <input
                    className='w-9 h-9 flex items-center justify-center'
                    name='size'
                    type='radio'
                    value='s'
                  />
                  S
                </label>
                <label>
                  <input
                    className='w-9 h-9 flex items-center justify-center'
                    name='size'
                    type='radio'
                    value='m'
                  />
                  M
                </label>
                <label>
                  <input
                    className='w-9 h-9 flex items-center justify-center'
                    name='size'
                    type='radio'
                    value='l'
                  />
                  L
                </label>
                <label>
                  <input
                    className='w-9 h-9 flex items-center justify-center'
                    name='size'
                    type='radio'
                    value='xl'
                  />
                  XL
                </label>
              </div>
              <div className='ml-auto text-sm text-gray-500 underline'>
                Size Guide
              </div>
            </div>
            <div className='flex space-x-3 mb-4 text-sm font-medium'>
              <div className='flex-auto flex space-x-3'>
                <button
                  className='w-1/2 flex items-center justify-center rounded-md bg-black text-white'
                  type='submit'
                >
                  Buy now
                </button>
                <button
                  className='w-1/2 flex items-center justify-center rounded-md border border-gray-300'
                  type='button'
                >
                  Add to bag
                </button>
              </div>
              <button
                className='flex-none flex items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300'
                type='button'
                aria-label='like'
              >
                <svg width='20' height='20' fill='currentColor'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                  />
                </svg>
              </button>
            </div>
            <p className='text-sm text-gray-500'>
              Free shipping on all continental US orders.
            </p>
          </form>
        </div>
        /* <div className='flex-1 flex flex-col'>
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
            </button> */
      ))}

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
