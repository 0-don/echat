import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import {
  useUserImagesQuery,
  useLogoutMutation,
  useMeQuery,
} from 'src/generated/graphql';
import NextLink from 'next/link';
import user from '/public/user.png';
import { useApolloClient } from '@apollo/client';
import { DarkMode } from './DarkMode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gray from '/public/gray.png';
import Image from 'next/image';
interface UserMenuProps {}

export const UserMenu: React.FC<UserMenuProps> = ({}) => {
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery();
  const { data: userImages } = useUserImagesQuery();
  const [logout] = useLogoutMutation();

  const profileUrl = userImages?.userImages?.find(
    ({ type }) => type === 'profile'
  )?.url;

  const userTop = data && (
    <Menu.Item>
      <div className='flex mb-1'>
        <Image
          width={'35'}
          height={'35'}
          layout='fixed'
          objectFit='cover'
          className='rounded-full bg-white'
          src={profileUrl ? profileUrl : user.src ?? gray.src}
        />
        <div className='flex'>
          <div className='block px-4 py-2 text-sm text-gray-700 dark:text-white'>
            {`Hello ${data.me?.username}`}
          </div>
          <div></div>
        </div>
      </div>
    </Menu.Item>
  );

  const darkMode = (
    <div className='flex justify-between items-center py-1'>
      <div className='flex justify-center items-center'>
        <FontAwesomeIcon
          size='xs'
          className='dark:text-white text-black mx-2'
          icon='moon'
        />
        <p className='cursor-pointer text-sm text-gray-700 dark:text-white'>
          Darkmode
        </p>
      </div>
      <DarkMode />
    </div>
  );

  const coins = data && (
    <div className='flex justify-between items-center py-1 dark:text-white text-black'>
      <div className='flex justify-center items-center'>
        <FontAwesomeIcon
          size='xs'
          className='dark:text-white text-black mx-2'
          icon='coins'
        />
        <p className='cursor-pointer text-sm text-gray-700 dark:text-white'>
          Coins
        </p>
      </div>
      <small className='mr-1'>{data.me?.coins.toFixed(2)}</small>
    </div>
  );

  let userMenu: JSX.Element | null = null;
  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    userMenu = (
      <>
        <Menu.Item>
          <NextLink href='/register'>
            <div className='cursor-pointer flex items-center text-gray-700 hover:bg-purple hover:text-white dark:hover:text-white dark:text-white'>
              <FontAwesomeIcon
                size='xs'
                className='dark:text-white text-black mx-2'
                icon='toolbox'
              />
              <p className='block py-2 text-sm cursor-pointer'>Register</p>
            </div>
          </NextLink>
        </Menu.Item>
        <Menu.Item>
          <NextLink href='/login'>
            <div className='cursor-pointer flex items-center text-gray-700 hover:bg-purple hover:text-white dark:hover:text-white dark:text-white'>
              <FontAwesomeIcon
                size='xs'
                className='dark:text-white text-black mx-2'
                icon='door-open'
              />
              <a className='block py-2 text-sm cursor-pointer'>Login</a>
            </div>
          </NextLink>
        </Menu.Item>
      </>
    );
  } else {
    userMenu = (
      <>
        <Menu.Item>
          <NextLink href='/setting/profile'>
            <div className='cursor-pointer flex items-center text-gray-700 hover:bg-purple hover:text-white dark:hover:text-white dark:text-white'>
              <FontAwesomeIcon
                size='xs'
                className='dark:text-white text-black mx-2'
                icon='toolbox'
              />
              <a className='block py-2 text-sm'>Settings</a>
            </div>
          </NextLink>
        </Menu.Item>
        <Menu.Item>
          <NextLink href='/orders'>
            <div className='cursor-pointer flex items-center text-gray-700 hover:bg-purple hover:text-white dark:hover:text-white dark:text-white'>
              <FontAwesomeIcon
                size='xs'
                className='dark:text-white text-black mx-2'
                icon='money-check'
              />
              <a className='block py-2 text-sm'>Order</a>
            </div>
          </NextLink>
        </Menu.Item>
        <Menu.Item>
          <div className='cursor-pointer flex items-center text-gray-700 hover:bg-purple hover:text-white dark:hover:text-white dark:text-white'>
            <FontAwesomeIcon
              size='xs'
              className='dark:text-white text-black mx-2'
              icon='running'
            />
            <div
              onClick={async () => {
                await logout();
                await apolloClient.resetStore();
                router.push('/');
              }}
              className='block py-2 text-sm'
            >
              Logout
            </div>
          </div>
        </Menu.Item>
      </>
    );
  }
  return (
    <>
      <Menu as='div' className='ml-3 relative'>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className='cursor-pointer bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple'>
                <span className='sr-only'>Open user menu</span>
                <Image
                  width={'35'}
                  height={'35'}
                  layout='fixed'
                  objectFit='cover'
                  className='rounded-full'
                  src={profileUrl ? profileUrl : user.src}
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
                className='z-50 origin-top-right absolute right-0 space mt-2 w-48 p-1 rounded-md shadow-lg bg-white dark:bg-dark text-white ring-1 ring-black ring-opacity-5 focus:outline-none'
              >
                {data?.me && userTop}
                {darkMode}
                {coins}
                {userMenu}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};
