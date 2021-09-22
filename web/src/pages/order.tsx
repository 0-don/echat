import { Wrapper } from '../components/Wrapper';
import { OrderSidebar } from 'src/components/order/OrderSidebar';
import withApollo from '../utils/apollo/withApollo';
import React, { useState } from 'react';
import { useGetbuyerOrdersQuery } from 'src/generated/graphql';
import { Button } from 'src/components/htmlElements';
import gray from '/public/gray.png';
import Image from 'next/image';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
dayjs.extend(localizedFormat);
export type OrderStatus = 'Cancelled' | 'Pending' | 'Started' | 'Completed';

const Order: React.FC = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('Pending');
  const { data } = useGetbuyerOrdersQuery();
  const orders = data?.getbuyerOrders.filter(
    (order) => order.status === orderStatus.toLocaleLowerCase()
  );
  return (
    <Wrapper
      navbar
      fluid
      scrollbar
      className='relative dark:text-white text-black'
    >
      <div className='flex h-full w-full absolute top-0'>
        <OrderSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          orderStatus={orderStatus}
          setOrderStatus={setOrderStatus}
        />
        <div className='flex flex-col w-full overflow-x-hidden overflow-y-auto lg:px-5'>
          <div className='flex justify-between mt-5'>
            <h1 className='text-3xl font-medium'>{orderStatus}</h1>
            <div className='md:hidden'>
              <Button
                text='services'
                icon='bars'
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
            </div>
          </div>
          {orders?.map(
            ({
              id,
              rounds,
              finalPrice,
              per,
              startTime,
              userService,
              seller,
              status,
            }) => (
              <div
                key={id}
                className='flex flex-col w-full mt-5 bg-dark rounded-b-md'
              >
                <div className='bg-dark-light w-full rounded-t-md pl-5 text-sm text-gray-300'>
                  Order ID: {id}
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-24 pl-5'>
                    <div className='flex items-center bg-dark-light rounded-full my-3 space-x-3 w-72'>
                      <Image
                        width={'45'}
                        height={'45'}
                        layout='fixed'
                        objectFit='contain'
                        className='rounded-full bg-white'
                        src={
                          seller?.images?.find(({ type }) => type == 'profile')
                            ?.url ?? gray.src
                        }
                      />
                      <div className='flex flex-col'>
                        <p className='font-medium'>{seller?.username}</p>
                        <p>{userService?.service.name}</p>
                      </div>
                    </div>

                    <div>
                      <p className='font-medium'>Order Time</p>
                      <p>{dayjs(startTime).format('lll')}</p>
                    </div>

                    <div>
                      <p className='font-medium'>Quantity</p>
                      <p className='text-center'>{rounds}</p>
                    </div>

                    <div className='flex items-center text-xl'>
                      <FontAwesomeIcon
                        size='lg'
                        className='dark:text-white text-black mr-1'
                        icon='coins'
                      />
                      <div className='font-bold'>{`${finalPrice.toFixed(
                        2
                      )} / ${per}`}</div>
                    </div>

                    <div>
                      <p className='font-medium'>Order Status</p>
                      <p className='text-center'>{status}</p>
                    </div>
                  </div>

                  <div className='mr-5'>
                    <p className='font-medium'>Options</p>
                    <p className='text-center'>{status}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Order);
