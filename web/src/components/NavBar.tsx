import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/helpers/isServer';
import { useApolloClient } from '@apollo/client';
import { DarkModeSwitch } from './utils/DarkModeSwitch';
import useDarkModeStore from '../store/DarkModeStore';

export const NavBar: React.FC = ({}) => {
  const { data, loading } = useMeQuery({ skip: isServer() });
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const { theme, hasHydrated } = useDarkModeStore();

  let userMenu: JSX.Element | null = null;
  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    userMenu = (
      <>
        <Menu.Item>
          <NextLink href='/register'>
            <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
              Register
            </a>
          </NextLink>
        </Menu.Item>
        <Menu.Item>
          <NextLink href='/login'>
            <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
              Login
            </a>
          </NextLink>
        </Menu.Item>
      </>
    );
  } else {
    userMenu = (
      <>
        <Menu.Item>
          <div className='block px-4 py-2 text-sm text-gray-700'>
            {`Hello ${data.me!.username}`}
          </div>
        </Menu.Item>
        <Menu.Item>
          <NextLink href='/setting/profile'>
            <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
              Settings
            </a>
          </NextLink>
        </Menu.Item>
        <Menu.Item>
          <div
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
            }}
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
          >
            Logout
          </div>
        </Menu.Item>
      </>
    );
  }

  return (
    <Disclosure as='nav' className='bg-white dark:bg-gray-800 shadow'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto'>
            <div className='relative flex justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <NextLink href='/'>
                    <img
                      className='block lg:hidden h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                      alt='Workflow'
                    />
                  </NextLink>
                  <NextLink href='/'>
                    <img
                      className='hidden lg:block h-8 w-auto'
                      src={
                        hasHydrated && theme
                          ? 'https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                          : 'https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg'
                      }
                      alt='Workflow'
                    />
                  </NextLink>
                </div>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  <NextLink href='/'>
                    <a className='border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-white'>
                      Home
                    </a>
                  </NextLink>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <Menu as='div' className='ml-3 relative'>
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                          <span className='sr-only'>Open user menu</span>
                          <img
                            className='h-8 w-8 rounded-full'
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            alt=''
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter='transition ease-out duration-200'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items
                          static
                          className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                        >
                          {userMenu}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>

                <DarkModeSwitch />
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='pt-2 pb-4 space-y-1'>
              <NextLink href='/'>
                <a className='bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Home
                </a>
              </NextLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
