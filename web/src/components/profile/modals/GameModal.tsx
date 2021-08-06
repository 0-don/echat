import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useGetAllGamesQuery } from 'src/generated/graphql';
import { Loading } from 'src/components/utils/Loading';
import Image from 'next/image';

export type GameModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const GameModal: React.FC<GameModalProps> = ({ open, setOpen }) => {
  const { data, loading } = useGetAllGamesQuery();
  if (!loading && data && data.getAllGames) {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed z-10 inset-0 overflow-y-auto'
          open={open}
          onClose={setOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6'>
                <button type='button'></button>
                <ul
                  role='list'
                  className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8'
                >
                  {data?.getAllGames.map(
                    ({ id, boxArtUrl, name, genres, multiplayer_modes }) => (
                      <li
                        key={id}
                        className='col-span-1 flex flex-col text-center divide-y'
                      >
                        <div className='flex-1 flex flex-col'>
                          <Image
                            src={boxArtUrl}
                            alt='Picture of the author'
                            width={500}
                            height={500}
                          />
                          <h3 className='mt-6 text-black text-sm font-medium'>
                            {name}
                          </h3>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
  } else {
    return <Loading />;
  }
};
