import { Formik, Form, FormikProps } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Button,
  DropdownField,
  InputField,
  Modal,
  TextAreaField,
} from 'src/components/htmlElements';
import { LEVELS, PERS } from 'src/constants';

import {
  GetUserGameDocument,
  UpsertUserGame,
  useGetAllGamesQuery,
  useGetUserGameQuery,
  useUpsertUserGameMutation,
} from 'src/generated/graphql';

interface UpsertGameModalProps {
  gameId: number;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const UpsertGameModal: React.FC<UpsertGameModalProps> = ({
  gameId,
  open,
  setOpen,
}) => {
  const [localOpen, setLocalOpen] = useState(false);
  const [upsertUserGame] = useUpsertUserGameMutation();
  const { data: allGamesData, loading: allGamesLoading } =
    useGetAllGamesQuery();
  const { data: userGameData, loading: userGameLoading } =
    useGetUserGameQuery();

  let game =
    !allGamesLoading &&
    allGamesData?.getAllGames?.find((game) => game.id === gameId);

  let userGame =
    !userGameLoading &&
    userGameData?.getUserGame?.find((game) => game.gameId === gameId);

  if (game && game?.images?.length && LEVELS?.length && PERS?.length) {
    return (
      <>
        <Modal
          open={open === undefined ? localOpen : open}
          setOpen={setOpen === undefined ? setLocalOpen : setOpen}
        >
          <div className='inline-block bg-white dark:bg-dark transform sm:align-middle sm:max-w-5xl w-full sm:w-full'>
            <img
              className='h-32 w-full object-cover lg:h-48'
              src={
                game.images[Math.floor(Math.random() * game.images.length)].url
              }
              alt=''
            />
            <div className='mx-auto flex justify-center -mt-16 sm:-mt-16'>
              <img
                className='h-24 ring-4 ring-white sm:h-32'
                src={game.boxArtUrl}
                alt=''
              />
            </div>
            <h1 className='text-3xl bg-white dark:bg-dark dark:text-white'>
              {game.name}
            </h1>
            <Formik
              initialValues={{
                gameId,
                level:
                  userGame && userGame.level ? userGame.level : LEVELS[0].name,
                platforms:
                  userGame && userGame.platforms
                    ? userGame.platforms
                    : [game.platforms[0]],
                description:
                  userGame && userGame.description ? userGame.description : '',
                price: userGame && userGame.price ? userGame.price : 0,
                per: userGame && userGame.price ? userGame.per : PERS[0].name,
              }}
              onSubmit={async (values) => {
                await upsertUserGame({
                  variables: { options: values },
                  refetchQueries: [{ query: GetUserGameDocument }],
                });
                setOpen === undefined ? setLocalOpen(false) : setOpen(false)
              }}
            >
              {(formikProps: FormikProps<UpsertUserGame>) => (
                <Form className='p-5'>
                  <div className='flex'>
                    <div className='w-6/12'>
                      <DropdownField
                        {...formikProps}
                        fieldName='level'
                        list={LEVELS}
                      />
                    </div>
                    <div className='w-6/12'>
                      <DropdownField
                        {...formikProps}
                        fieldName='platforms'
                        //  @ts-ignore
                        list={game.platforms}
                      />
                    </div>
                  </div>
                  <div className='flex mb-3'>
                    <div className='w-8/12'>
                      <TextAreaField
                        name='description'
                        value={formikProps.values.description!}
                        placeholder='description'
                        label='Description'
                      />
                    </div>
                    <div className='w-4/12'>
                      <InputField
                        name='price'
                        type='number'
                        icon='dollar-sign'
                        value={formikProps.values.price}
                        label='Price'
                      />
                      <DropdownField
                        {...formikProps}
                        fieldName='per'
                        list={PERS}
                      />
                    </div>
                  </div>
                  <Button type='submit' text='send' />
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      </>
    );
  } else {
    return null;
  }
};
