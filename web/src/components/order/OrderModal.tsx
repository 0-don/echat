import React, { useState } from 'react';
import { Modal } from 'src/components/htmlElements';
import {
  FieldError,
  GetUserServiceQuery,
  useCreateOrderMutation,
} from 'src/generated/graphql';
import gray from '/public/gray.png';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import { Alert } from '../utils/Alert';

interface OrderModalProps {
  data: GetUserServiceQuery | undefined;
}

export const OrderModal: React.FC<OrderModalProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const [createOrder] = useCreateOrderMutation();
  const [errors, setErrors] = useState<FieldError[]>();

  const [rounds, setRounds] = useState(1);
  const [startTime, setStartTime] = useState(new Date());

  const userService = data?.getUserService;
  const service = data?.getUserService.service;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, min, max }: any = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setRounds(value);
  };

  return (
    <>
      <button className='big-button' onClick={() => setOpen(!open)}>
        order
      </button>
      <Modal open={open} setOpen={() => open}>
        <div className='dark:text-white text-black inline-block max-w-lg bg-white dark:bg-dark rounded-lg text-left transform'>
          <div className='py-8 px-8'>
            {errors?.length! > 0 && (
              <Alert errors={errors!} setErrors={setErrors} />
            )}
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl'>Confirm Order</h1>
              <div className='cursor-pointer' onClick={() => setOpen(false)}>
                ×︁
              </div>
            </div>

            <div className='flex justify-between items-end'>
              <div className='flex space-x-5 mt-5'>
                <Image
                  placeholder='blur'
                  width={100}
                  height={100}
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
                  layout='fixed'
                  objectFit='cover'
                  className='rounded-xl'
                  src={service?.boxArtUrl ?? gray.src}
                />
                <div className='w-44'>
                  <h3 className='text-xl'>{service?.name}</h3>
                  <p className='text-sm'>{userService?.description}</p>
                </div>
              </div>

              <div className='flex space-x-1 font-medium'>
                <FontAwesomeIcon size='lg' icon='coins' />
                <p>{userService?.price.toFixed(2)}</p>
                <p>/</p>
                <p>{userService?.per}</p>
              </div>
            </div>

            <div className='flex justify-between mt-5 items-center'>
              <p className='text-xl'>Rounds</p>

              <div className='flex justify-between space-x-3'>
                <div
                  className='bg-dark-light hover:bg-purple py-1 px-3'
                  onClick={() =>
                    setRounds(rounds - 1 > 1 ? rounds - 1 : rounds)
                  }
                >
                  <FontAwesomeIcon size='sm' icon='minus' />
                </div>

                <input
                  name='rounds'
                  value={rounds}
                  max={999}
                  min={1}
                  onChange={handleChange}
                  type='number'
                  className='w-12 bg-dark-light text-center text-white'
                />

                <div
                  className='bg-dark-light hover:bg-purple py-1 px-3'
                  onClick={() =>
                    setRounds(rounds + 1 < 1000 ? rounds + 1 : rounds)
                  }
                >
                  <FontAwesomeIcon size='sm' icon='plus' />
                </div>
              </div>
            </div>
            <div className='flex justify-between mt-5 items-center'>
              <p className='text-xl'>Start Time</p>

              <div className='w-56 text-right'>
                <DatePicker
                  className='w-96 '
                  selected={startTime}
                  showTimeSelect
                  onChange={(date) => setStartTime(date as any)}
                  minDate={new Date()}
                  minTime={new Date()}
                  maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                  dateFormat='MMMM d, yyyy h:mm aa'
                />
              </div>
            </div>
            <hr className='border-lightGray my-5' />
            <div className='flex justify-between items-center '>
              <p className='text-xl'>Final Price</p>

              <div className='flex space-x-2'>
                <p>{rounds} Round(s) total</p>
                <FontAwesomeIcon size='lg' icon='coins' />
                <p className='text-lg'>
                  {userService && (rounds * userService?.price).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className='bg-dark-light py-6 px-8'>
            <div className='flex justify-end '>
              <button
                style={{ backgroundColor: 'transparent' }}
                className='bg-tran big-button mr-5'
                onClick={() => setOpen(false)}
              >
                cancel
              </button>
              <button
                onClick={async () => {
                  const { data } = await createOrder({
                    variables: {
                      userServiceId: userService!.id,
                      rounds,
                      startTime,
                    },
                  });
                  data?.createOrder.errors?.length &&
                    setErrors(data?.createOrder.errors);
                  console.log(data?.createOrder);
                }}
                className='big-button'
              >
                order
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
