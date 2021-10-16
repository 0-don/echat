import { Wrapper } from '../components/Wrapper';
import { OrderSidebar } from 'src/components/order/OrderSidebar';
import withApollo from '../utils/apollo/withApollo';
import React, { useState } from 'react';
import {
  FieldError,
  GetBuyerOrdersDocument,
  GetSellerOrdersDocument,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useCompleteOrderMutation,
  useGetBuyerOrdersQuery,
  useGetSellerOrdersQuery,
} from 'src/generated/graphql';
import { Button } from 'src/components/htmlElements';
import noOrder from '/public/noOrder.png';
import gray from '/public/gray.png';
import Image from 'next/image';
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'src/components/utils/Alert';
import { ReviewModal } from 'src/components/review/ReviewModal';

export type OrderStatus =
  | 'Cancelled'
  | 'Pending'
  | 'Started'
  | 'Completed'
  | undefined;

const Order: React.FC = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [errors, setErrors] = useState<FieldError[]>();
  const [buyerOrderStatus, setBuyerOrderStatus] =
    useState<OrderStatus>('Completed');
  const [sellerOrderStatus, setSellerOrderStatus] = useState<OrderStatus>();

  const { data: buyerData } = useGetBuyerOrdersQuery();
  const { data: sellerData } = useGetSellerOrdersQuery();

  const [cancelOrder] = useCancelOrderMutation();
  const [acceptOrder] = useAcceptOrderMutation();
  const [completeOrder] = useCompleteOrderMutation();

  const buyerOrders = buyerData?.getBuyerOrders.filter(
    (order) => order.status === buyerOrderStatus?.toLocaleLowerCase()
  );

  const sellerOrders = sellerData?.getSellerOrders.filter(
    (order) => order.status === sellerOrderStatus?.toLocaleLowerCase()
  );

  const noOrders = (
    <div className='flex flex-col justify-center items-center h-screen w-full space-y-3'>
      <div style={{ position: 'relative', width: '33%', height: '33%' }}>
        <Image
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
          layout='fill'
          objectFit='contain'
          className='opacity-10'
          src={noOrder.src}
        />
      </div>

      <h2 className='text-3xl font-medium opacity-50'>No Orders Here</h2>
      <p className='text-sm  opacity-50'>
        You don't have any orders. Start getting orders now
      </p>
    </div>
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
          buyerOrderStatus={buyerOrderStatus}
          setBuyerOrderStatus={setBuyerOrderStatus}
          sellerOrderStatus={sellerOrderStatus}
          setSellerOrderStatus={setSellerOrderStatus}
        />
        <div className='flex flex-col w-full overflow-x-hidden overflow-y-auto lg:px-5 mx-2 md:mx-0 py-5'>
          {errors?.length! > 0 && (
            <Alert errors={errors!} setErrors={setErrors} timeout={10000} />
          )}
          <div className='flex justify-between '>
            <h1 className='text-3xl font-medium'>
              {sellerOrderStatus ?? buyerOrderStatus}
            </h1>
            <div className='md:hidden'>
              <Button
                text='services'
                icon='bars'
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
            </div>
          </div>

          {/* Paird Orders */}
          {sellerOrders && sellerOrders.length === 0 && sellerOrderStatus
            ? noOrders
            : sellerOrders?.map(
                ({
                  id,
                  rounds,
                  finalPrice,
                  per,
                  startTime,
                  userService,
                  buyer,
                  status,
                  review,
                }) => (
                  <div
                    key={id}
                    className='flex flex-col w-full mt-5 bg-dark rounded-b-md'
                  >
                    <div className='bg-dark-light w-full rounded-t-md pl-5 text-sm text-gray-300'>
                      Order ID: {id}
                    </div>

                    <div className='flex flex-col md:flex-row md:items-center md:justify-between md:px-5 p-5 md:p-0 space-y-3 md:space-y-0 w-full'>
                      <div className='flex items-center bg-dark-light rounded-full md:my-3 space-x-3 w-full md:w-72'>
                        <Image
                          width={45}
                          height={45}
                          layout='fixed'
                          objectFit='cover'
                          className='rounded-full'
                          src={
                            buyer?.images?.find(({ type }) => type == 'profile')
                              ?.url ?? gray.src
                          }
                        />
                        <div className='flex flex-col'>
                          <p className='font-medium'>{buyer?.username}</p>
                          <p>{userService?.service.name}</p>
                        </div>
                      </div>

                      <div className='flex justify-between md:flex-col'>
                        <p className='font-medium'>Order Time</p>
                        <p>{dayjs(startTime).format('lll')}</p>
                      </div>

                      <div className='flex justify-between md:flex-col'>
                        <p className='font-medium'>Quantity</p>
                        <p className='text-center'>{rounds}</p>
                      </div>

                      <div className='flex justify-between items-center md:flex-col'>
                        <p className='font-medium md:hidden'>Price</p>
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
                      </div>

                      <div className='flex justify-between md:flex-col'>
                        <p className='font-medium'>Order Status</p>
                        <p className='text-center'>{status}</p>
                      </div>

                      <div className='flex justify-between md:flex-col md:items-center'>
                        <p className='font-medium mb-2'>Options</p>
                        <div className='flex space-x-5 items-center '>
                          {sellerOrderStatus === 'Pending' && (
                            <button
                              onClick={async () =>
                                await acceptOrder({
                                  variables: { id },
                                  refetchQueries: [
                                    { query: GetSellerOrdersDocument },
                                  ],
                                })
                              }
                              className='bg-lightGray hover:bg-purple rounded-xl px-2 py-0.5'
                            >
                              accept
                            </button>
                          )}
                          {sellerOrderStatus === 'Started' && (
                            <button
                              onClick={async () => {
                                const { data } = await completeOrder({
                                  variables: { id, buyerId: buyer?.id },
                                  refetchQueries: [
                                    { query: GetSellerOrdersDocument },
                                  ],
                                });

                                data?.completeOrder.errors?.length &&
                                  setErrors(data.completeOrder.errors);
                              }}
                              className='bg-lightGray hover:bg-purple rounded-xl px-2 py-0.5'
                            >
                              complete
                            </button>
                          )}
                          {sellerOrderStatus === 'Pending' ||
                            (sellerOrderStatus === 'Started' && (
                              <FontAwesomeIcon
                                id='trash'
                                size='sm'
                                title='cancel order'
                                className='dark:text-white text-black dark:hover:text-purple hover:text-purple'
                                icon='trash-alt'
                                onClick={async () =>
                                  await cancelOrder({
                                    variables: { id, buyerId: buyer?.id },
                                    refetchQueries: [
                                      { query: GetSellerOrdersDocument },
                                    ],
                                  })
                                }
                              />
                            ))}
                          <FontAwesomeIcon
                            size='sm'
                            title='chat'
                            className='dark:text-white text-black dark:hover:text-purple hover:text-purple'
                            icon='comment-dots'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

          {/* Purchased Orders */}
          {buyerOrders && buyerOrders.length === 0 && buyerOrderStatus
            ? noOrders
            : buyerOrders?.map(
                ({
                  id,
                  rounds,
                  finalPrice,
                  per,
                  startTime,
                  userService,
                  seller,
                  review,
                  status,
                }) => (
                  <div
                    key={id}
                    className='flex flex-col w-full mt-5 bg-dark rounded-b-md'
                  >
                    <div className='bg-dark-light w-full rounded-t-md pl-5 text-sm text-gray-300'>
                      Order ID: {id}
                    </div>

                    <div className='flex flex-col md:flex-row md:items-center md:justify-between md:px-5 p-5 md:p-0 space-y-3 md:space-y-0 w-full'>
                      <div className='flex items-center bg-dark-light rounded-full md:my-3 space-x-3 w-full md:w-72'>
                        <Image
                          width={45}
                          height={45}
                          layout='fixed'
                          objectFit='cover'
                          className='rounded-full'
                          src={
                            seller?.images?.find(
                              ({ type }) => type == 'profile'
                            )?.url ?? gray.src
                          }
                        />
                        <div className='flex flex-col'>
                          <p className='font-medium'>{seller?.username}</p>
                          <p>{userService?.service.name}</p>
                        </div>
                      </div>

                      <div className='flex justify-between md:flex-col'>
                        <p className='font-medium'>Order Time</p>
                        <p>{dayjs(startTime).format('lll')}</p>
                      </div>

                      <div className='flex justify-between md:flex-col'>
                        <p className='font-medium'>Quantity</p>
                        <p className='text-center'>{rounds}</p>
                      </div>

                      <div className='flex justify-between items-center md:flex-col'>
                        <p className='font-medium md:hidden'>Price</p>
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
                      </div>

                      <div className='flex justify-between md:flex-col'>
                        <p className='font-medium'>Order Status</p>
                        <p className='text-center'>{status}</p>
                      </div>

                      <div className='flex justify-between md:flex-col md:items-center'>
                        <p className='font-medium mb-2'>Options</p>
                        <div className='flex space-x-5 items-center '>
                          {buyerOrderStatus === 'Pending' && (
                            <FontAwesomeIcon
                              id='trash'
                              size='sm'
                              title='cancel order'
                              className='dark:text-white text-black dark:hover:text-purple hover:text-purple'
                              icon='trash-alt'
                              onClick={async () =>
                                await cancelOrder({
                                  variables: { id, sellerId: seller?.id },
                                  refetchQueries: [
                                    { query: GetBuyerOrdersDocument },
                                  ],
                                })
                              }
                            />
                          )}
                          {buyerOrderStatus === 'Started' && (
                            <button
                              onClick={async () => {
                                const { data } = await completeOrder({
                                  variables: { id, sellerId: seller?.id },
                                  refetchQueries: [
                                    { query: GetBuyerOrdersDocument },
                                  ],
                                });

                                data?.completeOrder.errors?.length &&
                                  setErrors(data?.completeOrder.errors);
                              }}
                              className='bg-lightGray hover:bg-purple rounded-xl px-2 py-0.5'
                            >
                              complete
                            </button>
                          )}

                          {buyerOrderStatus === 'Completed' && !review && (
                            <ReviewModal orderId={id} targetId={seller!.id} />
                          )}
                          <FontAwesomeIcon
                            size='sm'
                            title='chat'
                            className='dark:text-white text-black dark:hover:text-purple hover:text-purple'
                            icon='comment-dots'
                          />
                        </div>
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
