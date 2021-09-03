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
import gray from '/public/gray.png';

import {
  GetMeUserServiceDocument,
  UpsertUserService,
  useGetServicesQuery,
  useGetMeUserServiceQuery,
  useUpsertUserServiceMutation,
} from 'src/generated/graphql';

interface UpsertServiceModalProps {
  serviceId: number;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const UpsertServiceModal: React.FC<UpsertServiceModalProps> = ({
  serviceId,
  open,
  setOpen,
}) => {
  const [localOpen, setLocalOpen] = useState(false);
  const [upsertUserService] = useUpsertUserServiceMutation();
  const { data: allServicesData, loading: allServicesLoading } =
  useGetServicesQuery();
  const { data: MeUserServiceData, loading: MeUserServiceLoading } =
    useGetMeUserServiceQuery();

  let service =
    !allServicesLoading &&
    allServicesData?.getServices?.find(
      (service) => service.id === serviceId
    );

  let userGame =
    !MeUserServiceLoading &&
    MeUserServiceData?.getMeUserService?.find(
      (service) => service.serviceId === serviceId
    );

  if (service && LEVELS?.length && PERS?.length) {
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
                service?.images?.length
                  ? service.images[
                      Math.floor(Math.random() * service.images.length)
                    ].url
                  : gray.src
              }
              alt=''
            />
            <div className='flex justify-center -mt-16 sm:-mt-16'>
              <img
                className='h-24 shadow-xl sm:h-32'
                src={service.boxArtUrl}
                alt=''
              />
            </div>
            <h1 className='text-3xl bg-white dark:bg-dark dark:text-white'>
              {service.name}
            </h1>
            <Formik
              initialValues={{
                serviceId,
                level:
                  userGame && userGame.level ? userGame.level : LEVELS[0].name,
                platforms:
                  userGame && userGame.platforms
                    ? userGame.platforms
                    : service.platforms
                    ? [service.platforms[0]]
                    : undefined,
                description:
                  userGame && userGame.description ? userGame.description : '',
                price: userGame && userGame.price ? userGame.price : 0,
                per: userGame && userGame.price ? userGame.per : PERS[0].name,
              }}
              onSubmit={async (values) => {
                await upsertUserService({
                  variables: { options: values },
                  refetchQueries: [{ query: GetMeUserServiceDocument }],
                });
                setOpen === undefined ? setLocalOpen(false) : setOpen(false);
              }}
            >
              {(formikProps: FormikProps<UpsertUserService>) => (
                <Form className='p-5'>
                  <div className='sm:flex'>
                    <div className='sm:w-6/12 sm:mr-2.5'>
                      <DropdownField
                        {...formikProps}
                        fieldName='level'
                        list={LEVELS}
                      />
                    </div>
                    <div className='sm:w-6/12 sm:ml-2.5'>
                      {formikProps.values.platforms?.length && (
                        <DropdownField
                          {...formikProps}
                          fieldName='platforms'
                          //  @ts-ignore
                          list={service.platforms}
                        />
                      )}
                    </div>
                  </div>
                  <div className='sm:flex mb-3'>
                    <div className='sm:w-6/12 sm:mr-2.5'>
                      <TextAreaField
                        name='description'
                        value={formikProps.values.description!}
                        placeholder='description'
                        label='Description'
                      />
                    </div>
                    <div className='flex sm:w-6/12 sm:ml-2.5'>
                      <div className='w-6/12 mr-2.5'>
                        <InputField
                          name='price'
                          type='number'
                          icon='dollar-sign'
                          value={formikProps.values.price}
                          label='Price'
                        />
                      </div>
                      <div className='w-6/12 ml-2.5'>
                        <DropdownField
                          {...formikProps}
                          fieldName='per'
                          list={PERS}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex items-end justify-end'>
                    <Button type='submit' text='send' />
                  </div>
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
