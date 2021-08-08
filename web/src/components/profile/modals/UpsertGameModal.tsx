import { Formik, Form, FormikProps } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import {
  Button,
  DropdownField,
  InputField,
  Modal,
  TextAreaField,
} from 'src/components/htmlElements';
import { LEVELS, PERS } from 'src/constants';

import {
  UpsertUserGame,
  useGetAllGamesQuery,
  useGetUserGameQuery,
  useUpsertUserGameMutation,
} from 'src/generated/graphql';

interface UpsertGameModalProps {
  gameId: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpsertGameModal: React.FC<UpsertGameModalProps> = ({
  gameId,
  open,
  setOpen,
}) => {
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
    userGameData!.getUserGame!.find((game) => game.gameId === gameId);

  userGame;
  if (!allGamesLoading && game && game.images && game.images.length) {
    return (
      <>
        <Modal open={open} setOpen={setOpen}>
          <div className='inline-block bg-white dark:bg-gray-700 transform sm:align-middle sm:max-w-5xl w-full sm:w-full'>
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
            <h1 className='text-3xl bg-gray-700 dark:text-white'>
              {game.name}
            </h1>
            <Formik
              initialValues={{
                gameId,
                level: LEVELS[0].name,
                platforms: [game.platforms[0]],
                description: '',
                price: 0,
                per: PERS[0].name,
              }}
              onSubmit={async (values, { setErrors }) => {
                console.log(values);
                const data = await upsertUserGame({
                  variables: { options: values },
                });

                console.log(data);
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
                        value={formikProps.values.description}
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
