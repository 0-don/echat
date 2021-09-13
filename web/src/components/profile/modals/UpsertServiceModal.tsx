import { Formik, Form, FormikProps } from 'formik';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Button,
  DropdownField,
  FilesUpload,
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
  const [bgImage, setBgImage] = useState<
    { src: string; serviceId: number } | undefined
  >();
  const [localOpen, setLocalOpen] = useState(false);
  const [upsertUserService] = useUpsertUserServiceMutation();
  const { data: allServicesData } = useGetServicesQuery();
  const { data: MeUserServiceData } = useGetMeUserServiceQuery();

  let service = allServicesData?.getServices?.find(
    (service) => service.id === serviceId
  );

  let userService = MeUserServiceData?.getMeUserService?.find(
    (service) => service.serviceId === serviceId
  );

  useEffect(() => {
    // bgImage?.serviceId !== serviceId &&
    //   userService?.image &&
    //   setBgImage({ src: userService?.image, serviceId });

    bgImage?.serviceId !== serviceId &&
      service?.images &&
      service?.images?.length > 0 &&
      setBgImage({
        src: service.images[Math.floor(Math.random() * service.images.length)]
          .url,
        serviceId,
      });

    bgImage?.serviceId !== serviceId &&
      service?.images?.length === 0 &&
      !userService?.image &&
      setBgImage(undefined);
  }, [serviceId, userService?.image]);
  // console.log(userService?.image);
  if (service && LEVELS?.length && PERS?.length) {
    return (
      <>
        <Modal
          open={open === undefined ? localOpen : open}
          setOpen={setOpen === undefined ? setLocalOpen : setOpen}
        >
          <div className='inline-block bg-white dark:bg-dark transform sm:align-middle sm:max-w-5xl w-full sm:w-full'>
            <Formik
              initialValues={{
                serviceId,
                image: userService?.image || undefined,
                level:
                  userService && userService.level
                    ? userService.level
                    : LEVELS[0].name,
                platforms:
                  userService && userService.platforms
                    ? userService.platforms
                    : service.platforms
                    ? [service.platforms[0]]
                    : undefined,
                description:
                  userService && userService.description
                    ? userService.description
                    : '',
                price: userService && userService.price ? userService.price : 0,
                per:
                  userService && userService.price
                    ? userService.per
                    : PERS[0].name,
              }}
              onSubmit={async (values) => {
                console.log(values);
                await upsertUserService({
                  variables: { options: values },
                  refetchQueries: [{ query: GetMeUserServiceDocument }],
                });
                setOpen === undefined ? setLocalOpen(false) : setOpen(false);
              }}
            >
              {(formikProps: FormikProps<UpsertUserService>) => (
                <Form className='p-5'>
                  <img
                    className='h-32 w-full object-cover lg:h-48'
                    src={formikProps.values.image ?? bgImage?.src ?? gray.src}
                    alt=''
                  />
                  <div className='flex justify-center -mt-16 sm:-mt-16'>
                    <img
                      className='h-24 shadow-xl sm:h-32'
                      src={service?.boxArtUrl}
                      alt=''
                    />
                  </div>
                  <h1 className='text-3xl bg-white dark:bg-dark dark:text-white'>
                    {service?.name}
                  </h1>
                  <FilesUpload type='service' />
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
