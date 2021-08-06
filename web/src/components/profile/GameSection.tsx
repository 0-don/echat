import { MailIcon, PhoneIcon } from '@heroicons/react/outline';
import { FormikProps } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useGetAllGamesQuery } from 'src/generated/graphql';
import { Loading } from '../utils';
import { StepType } from '../utils/FormSteps';

interface GameSectionProps {
  formikRef: React.RefObject<FormikProps<any>>;
  currentStep?: string;
  steps?: StepType[];
  setSteps?: Dispatch<SetStateAction<StepType[]>>;
}

export const GameSection: React.FC<GameSectionProps> = ({ formikRef }) => {
  formikRef;
  const { data, loading } = useGetAllGamesQuery();

  // console.log(data?.getAllGames);
  const click = () => {
    data?.getAllGames!.map((game) => console.log(game.genres));
  };

  if (!loading && data && data.getAllGames) {
    return (
      <>
        <ul
          role='list'
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8'
        >
          {data?.getAllGames.map(
            ({ id, boxArtUrl, name, genres, multiplayer_modes }) => (
              <li
                key={id}
                className='col-span-1 flex flex-col text-center rounded-lg shadow divide-y divide-gray-200'
              >
                <div className='flex-1 flex flex-col'>
                  <img
                    className='w-full h-44 flex-shrink-0 mx-auto '
                    src={boxArtUrl}
                    alt=''
                  />
                  <h3 className='mt-6 text-white text-sm font-medium'>
                    {name}
                  </h3>
                  <button className="mb-1 text-gray-400 text-xs" onClick={click}>
                    {genres && genres.join(", ")}
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      </>
    );
  } else {
    return <Loading />;
  }
};
