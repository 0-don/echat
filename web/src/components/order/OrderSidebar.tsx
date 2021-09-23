import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import _ from 'lodash';
import { OrderStatus } from 'src/pages/order';
// import { useRouter } from 'next/router';

interface OrderSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  orderStatus: OrderStatus;
  setOrderStatus: Dispatch<SetStateAction<OrderStatus>>;
}

export const OrderSidebar: React.FC<OrderSidebarProps> = ({
  setSidebarOpen,
  sidebarOpen,
  orderStatus,
  setOrderStatus,
}) => {
  const items = (
    <div className='p-5 flex flex-col space-y-2 dark:text-white text-black'>
      <h5 className='text-xl font-medium'>Purchased Orders</h5>
      <p
        className={`${
          orderStatus === 'Cancelled' && 'bg-purple-dark font-medium'
        } hover:bg-purple rounded-md py-2 pl-1`}
        onClick={() => setOrderStatus('Cancelled')}
      >
        Cancelled
      </p>
      <p
        className={`${
          orderStatus === 'Pending' && 'bg-purple-dark font-medium'
        } hover:bg-purple rounded-md py-2 pl-1`}
        onClick={() => setOrderStatus('Pending')}
      >
        Pending
      </p>
      <p
        className={`${
          orderStatus === 'Started' && 'bg-purple-dark font-medium'
        } hover:bg-purple rounded-md py-2 pl-1`}
        onClick={() => setOrderStatus('Started')}
      >
        Started
      </p>
      <p
        className={`${
          orderStatus === 'Completed' && 'bg-purple-dark font-medium'
        } hover:bg-purple rounded-md py-2 pl-1`}
        onClick={() => setOrderStatus('Completed')}
      >
        Completed
      </p>
    </div>
  );

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-40 md:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col w-64 max-w-64 bg-dark-dark'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto bg-dark'>
                <nav className='px-2 space-y-1'>{items}</nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14'>
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className='hidden md:flex md:flex-shrink-1'>
        <nav
          style={{ maxWidth: '16rem', width: '16rem' }}
          className='flex flex-col px-2 space-y-1 bg-dark'
        >
          {items}
        </nav>
      </div>
    </>
  );
};
