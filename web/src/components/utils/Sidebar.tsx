import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  HomeIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';
import { useGetAllServicesQuery } from 'src/generated/graphql';
import _ from 'lodash';
import { useRouter } from 'next/router';

interface SidebarProps {}

type TabState = {
  key: string;
  state: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { data } = useGetAllServicesQuery();
  const groupedServices = _.groupBy(data?.getAllServices, 'type');

  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tabs, setTabs] = useState<TabState[]>(
    Object.keys(groupedServices).map((key) => ({
      key,
      state: false,
    }))
  );

  const items = Object.keys(groupedServices).map((key) => (
    <div className='text-white' key={key}>
      <div
        onClick={() => {
          setTabs(
            tabs.map((tab) =>
              tab.key === key ? { ...tab, state: !tab.state } : tab
            )
          );
        }}
        className='mt-2 flex items-center p-2 transition-colors rounded-md dark:text-light hover:bg-indigo-600'
      >
        <span aria-hidden='true'>
          <HomeIcon className=' mr-4 h-6 w-6' aria-hidden='true' />
        </span>
        <span className='text-sm font-bold'>{key}</span>
        <span aria-hidden='true' className='ml-auto'>
          <ChevronDownIcon className='h-6 w-6' aria-hidden='true' />
        </span>
      </div>

      {tabs.map(
        (tab) =>
          tab.key === key &&
          tab.state === true &&
          groupedServices[key].map(({ id, name, slug }) => (
            <div
              className='mt-2 space-y-2 px-7'
              key={id}
              onClick={() => {
                router.push(`/browse/${slug}`);
              }}
            >
              {name}
            </div>
          ))
      )}
    </div>
  ));

  return (
    <div className='md:flex flex-col md:flex-row md:min-h-screen'>
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
            <div className='relative flex-1 flex flex-col max-w-xs w-full bg-gray-800'>
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
              <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
                <nav className='px-2 space-y-1'>{items}</nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14'>
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className='hidden md:flex md:flex-shrink-0'>
        <nav className='flex flex-col w-64 px-2 bg-gray-800 space-y-1'>
          {items}
        </nav>
      </div>

      <button
        type='button'
        className='md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
        onClick={() => setSidebarOpen(true)}
      >
        <span className='sr-only'>Open sidebar</span>
        <MenuIcon className='h-6 w-6 text-white' aria-hidden='true' />
      </button>
    </div>
  );
};
