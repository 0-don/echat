import React, { useState } from 'react';
import { useGetAllGamesQuery } from 'src/generated/graphql';
import { Loading } from 'src/components/utils/Loading';
import { Button, Modal } from 'src/components/htmlElements';
import { UpsertGameModal } from './UpsertGameModal';

export const GameModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameId, setGameId] = useState(0);
  const { data, loading } = useGetAllGamesQuery();

  return (
    <>
      <Button text='add game' onClick={() => setOpen(!open)} />
      <Modal open={open} setOpen={setOpen}>
        <div className='inline-block align-bottom bg-white dark:bg-dark rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6'>
          <button></button>
          <ul
            role='list'
            className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8'
          >
            {!loading && data && data.getAllGames ? (
              data?.getAllGames.map(
                ({ id, boxArtUrl, name, genres, multiplayer_modes }) => (
                  <li
                    key={id}
                    onClick={() => {
                      setGameId(id);
                      setOpen(false);
                      setGameOpen(true);
                    }}
                    className='col-span-1 flex flex-col text-center divide-y'
                  >
                    <div className='flex-1 flex flex-col text-purple'>
                      <div className='hover:bg-purple'>
                      <img
                        className='flex-shrink-0 mx-auto hover:border hover:border-purple  transition duration-200 ease-in-out hover:transform hover:translate-x-4 hover:translate-y-4'
                        src={boxArtUrl}
                        alt='' 
                      /></div>
                      <h3 className='mt-6 text-black  dark:text-white text-sm font-medium'>
                        {name}
                      </h3> 
                    </div>
                  </li>
                )
              )
            ) : (
              <Loading />
            )}
          </ul>
        </div>
      </Modal>
      <UpsertGameModal gameId={gameId} open={gameOpen} setOpen={setGameOpen} />
    </>
  );
};
