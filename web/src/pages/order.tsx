import { Wrapper } from '../components/Wrapper';
import { OrderSidebar } from 'src/components/order/OrderSidebar';
import withApollo from '../utils/apollo/withApollo';
import React, { useState } from 'react';
import { useGetbuyerOrdersQuery } from 'src/generated/graphql';
import { Button } from 'src/components/htmlElements';

export type OrderStatus = 'Pending' | 'Started' | 'Completed';

const Order: React.FC = ({}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('Pending');
  const { data } = useGetbuyerOrdersQuery();
  const orders = data?.getbuyerOrders;

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
          <div className='md:hidden'>
            <Button
              text='services'
              icon='bars'
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
          {orders?.map((order) => (
            <div>
              {order.finalPrice}/{order.per}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Order);
