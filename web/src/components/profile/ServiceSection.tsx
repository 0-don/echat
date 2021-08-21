import { FormikProps } from 'formik';
import React, { useState } from 'react';
import {
  GetUserServiceDocument,
  useDeleteUserServiceMutation,
  useGetUserServiceQuery,
  useSwitchUserServiceStatusMutation,
} from 'src/generated/graphql';
import useFormStore from 'src/store/FormStore';
import { Button, SwitchField } from '../htmlElements';
import { Loading } from '../utils';
import { ServiceModal } from './modals/ServiceModal';
import { UpsertServiceModal } from './modals/UpsertGameModal';

interface ServiceSectionProps {
  formikRef?: React.RefObject<FormikProps<any>>;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
  formikRef,
}) => {
  formikRef;
  const { setStep } = useFormStore();
  const { data, loading } = useGetUserServiceQuery();
  const [deleteUserService] = useDeleteUserServiceMutation();
  const [switchUserServiceStatus] = useSwitchUserServiceStatusMutation();
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceId, setServiceId] = useState(0);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <UpsertServiceModal
        serviceId={serviceId}
        open={serviceOpen}
        setOpen={setServiceOpen}
      />
      <div className='flex justify-end my-3 '>
        <ServiceModal />
      </div>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {data?.getUserService?.map(
          ({ __typename, id, per, price, service, status }) => (
            <div
              key={service.boxArtUrl}
              className='bg-white dark:bg-dark dark:text-white flex flex-col select-none mx-1'
            >
              <h1 className='font-semibold py-1 text-center text-black dark:text-white'>
                {service.name}
              </h1>
              <div className='relative'>
                <img
                  src={service.boxArtUrl}
                  className={`w-full ${!status && 'opacity-50'}`}
                />
                <div className='absolute top-0 right-0 bg-dark rounded-full mt-0.5 mr-0.5'>
                  <SwitchField
                    checked={status}
                    onChange={async () => {
                      await switchUserServiceStatus({
                        variables: { id },
                        refetchQueries: [{ query: GetUserServiceDocument }],
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
                      setServiceId(service.id);
                      setServiceOpen(!serviceOpen);
                    }}
                  />
                  <Button
                    text='delete'
                    className='py-1 w-6/12 rounded-none'
                    icon='trash-alt'
                    onClick={async () => {
                      await deleteUserService({
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
        {data?.getUserService?.length && (
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
