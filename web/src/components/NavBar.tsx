import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import NextLink from 'next/link';
import useDarkModeStore from '../store/DarkModeStore';
import { UserMenu } from './utils/UserMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMeQuery } from 'src/generated/graphql';


const currentURL = () =>
  typeof window !== 'undefined'
    ? new URL(window.location.href).pathname.split('/')
    : undefined;

export const NavBar: React.FC = ({}) => {
  const { theme, hasHydrated } = useDarkModeStore();
  const { data } = useMeQuery();

  const [activeMenu, setActiveMenu] = useState<string[] | undefined>();

  useEffect(() => {
    setActiveMenu(currentURL());
  }, []);


  return (
    <Disclosure as='nav' className='bg-white dark:bg-dark shadow'>
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
                    <a
                      className={`${
                        activeMenu?.length === 2
                          ? 'border-purple'
                          : 'border-white'
                      } text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-white`}
                    >
                      Home
                    </a>
                  </NextLink>
                  <NextLink href='/browse/league-of-legends'>
                    <a
                      className={`${
                        activeMenu?.length && activeMenu[1] === 'browse'
                          ? 'border-purple'
                          : 'border-white'
                      } text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium dark:text-white`}
                    >
                      Browse
                    </a>
                  </NextLink>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {data?.me && (
                  <NextLink href='/setting/profile'>
                    <a className='rounded-full text-sm px-1.5 text-white bg-dark-light dark:bg-purple dark:hover:bg-purple-dark hover:bg-purple '>
                      <FontAwesomeIcon
                        size='xs'
                        className='dark:text-white text-black mr-1'
                        icon='gamepad'
                      />
                      service form
                    </a>
                  </NextLink>
                )}
                {/* UserMenu */}
                <UserMenu />
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='py-2 space-y-1'>
              <NextLink href='/'>
                <a
                  className={`${
                    activeMenu?.length === 2 ? 'bg-purple text-white' : ''
                  } hover:bg-purple-dark block pl-3 pr-4 py-2 text-base font-medium`}
                >
                  Home
                </a>
              </NextLink>
              <NextLink href='/browse/league-of-legends'>
                <a
                  className={`${
                    activeMenu?.length && activeMenu[1] === 'browse'
                      ? 'bg-purple'
                      : 'text-black dark:text-white '
                  } hover:bg-purple-dark block pl-3 pr-4 py-2 text-base font-medium`}
                >
                  Browse
                </a>
              </NextLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
