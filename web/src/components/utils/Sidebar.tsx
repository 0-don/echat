import React, { Dispatch, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, ChevronDownIcon } from '@heroicons/react/outline';
import {
  FilterUserServiceQueryVariables,
  GetServicesQuery,
} from 'src/generated/graphql';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useServiceFilterStore from 'src/store/ServiceFilterStore';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
  data: GetServicesQuery | undefined;
  refetch: (variables: FilterUserServiceQueryVariables) => void;
}

type TabState = {
  key: string;
  state: boolean;
  icon: string;
};

const sidebarIcon = (key: string) => {
  switch (key) {
    case 'Interactive Entertainment':
      return 'trophy';
    case 'Games':
      return 'gamepad';
    case 'More Lifestyles':
      return 'couch';
    default:
      return 'star';
  }
};
const checkUrl = (string: string) => window.location.href.includes(string);

export const Sidebar: React.FC<SidebarProps> = ({
  setSidebarOpen,
  sidebarOpen,
  data,
  refetch,
}) => {
  if (!data) {
    return null;
  }

  const router = useRouter();
  const { filterQuery, setSlug, setOptions } = useServiceFilterStore();
  const groupedServices = _.groupBy(data?.getServices, 'type');

  const [tabs, setTabs] = useState<TabState[]>(
    Object.keys(groupedServices).map((key) => ({
      key,
      state: false,
      icon: sidebarIcon(key),
    }))
  );

  const items = Object.keys(groupedServices).map((key, index) => (
    <div
      className='text-white flex flex-col mt-5'
      style={{ maxHeight: 'calc(100vh - 195px' }}
      key={key}
    >
      <div
        onClick={() => {
          setTabs(
            tabs.map((tab) =>
              tab.key === key ? { ...tab, state: !tab.state } : tab
            )
          );
        }}
        className={`${
          tabs[index].state ? 'bg-purple' : 'bg-dark'
        } mb-2 flex items-center p-2 transition-colors rounded-md dark:text-light hover:bg-purple`}
      >
        <span aria-hidden='true'>
          <FontAwesomeIcon
            size='xs'
            className='dark:text-white text-black mr-1'
            icon={tabs[index].icon as any}
          />
        </span>
        <span className='text-sm font-bold'>{key}</span>
        <span aria-hidden='true' className='ml-auto'>
          <ChevronDownIcon
            className={`${
              tabs[index].state && '-rotate-180'
            } h-6 w-6 transform transition-all`}
            aria-hidden='true'
          />
        </span>
      </div>

      <div className='flex flex-col overflow-x-hidden overflow-y-auto'>
        {tabs.map(
          (tab) =>
            tab.key === key &&
            tab.state === true &&
            groupedServices[key].map(({ id, name, slug }) => (
              <div
                className={`${
                  checkUrl(slug) && 'text-purple'
                } mt-2 space-y-2 px-7 hover:text-purple`}
                key={slug}
                onClick={async () => {
                  setOptions({});
                  setSlug(slug);
                  refetch({
                    ...filterQuery,
                    slug,
                    filterOptions: undefined,
                    cursor: undefined,
                  });
                  router.push(`/browse/${slug}`);
                }}
              >
                {name}
              </div>
            ))
        )}
      </div>
    </div>
  ));

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
        <nav className='flex flex-col lg:w-72 px-2 space-y-1'>{items}</nav>
      </div>
    </>
  );
};
