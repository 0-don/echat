import React, { useState } from 'react';
import withApollo from 'src/utils/apollo/withApollo';
import { Wrapper } from 'src/components/Wrapper';
import { Sidebar } from 'src/components/utils/Sidebar';
import { useFilterUserServiceQuery } from 'src/generated/graphql';
import gray from '/public/gray.png';
import { NextPage } from 'next';
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { coinFlip, getRandomBetween } from 'src/utils';
import { Button } from 'src/components/htmlElements';

dayjs.extend(relativeTime);

const Browse: NextPage<{ slug: string }> = ({ slug }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: userService, loading: userServiceLoading } =
    useFilterUserServiceQuery({ variables: { slug } });

  return (
    <Wrapper navbar className=''>
      <div className='flex justify-end md:hidden'>
        <Button
          text='service filter'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      <div className='flex antialiased mt-4 dark:text-light'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='flex-1'>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-white p-5'>
            {!userServiceLoading &&
              userService?.filterUserService?.map(({ user, price }, index) => (
                <div
                  key={index}
                  className='bg-white dark:bg-dark p-1flex flex-col mx-1 rounded-xl'
                >
                  <img
                    src={
                      user && user.images && user.images[0]
                        ? user.images[0].url
                        : gray.src
                    }
                    className='h-auto'
                  />

                  <div className='p-2'>
                    <div className='flex items-center'>
                      {/* <span
                        className={`${
                          dateNow.diff(user.lastOnline, 'day') * -1 < 2
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        } h-4 w-4 rounded-full mr-1`}
                      /> */}
                      <span
                        className={`${
                          coinFlip() ? 'bg-green-500' : 'bg-gray-500'
                        } h-4 w-4 rounded-full mr-1`}
                      />
                      <h1 className='text-base my-1 font-semibold text-center text-black dark:text-white'>
                        {user.username}
                      </h1>
                    </div>
                    <div className='flex items-center divide-x-2 divide-y-8 '>
                      <FontAwesomeIcon
                        size='xs'
                        className='dark:text-yellow-500 text-black mr-1'
                        icon='star'
                      />
                      {`${getRandomBetween(2, 5)}.${getRandomBetween(
                        0,
                        9
                      )} (${getRandomBetween(10, 400)})`}
                    </div>
                    <hr className='border-lightGray my-1' />
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <FontAwesomeIcon
                          size='xs'
                          className='dark:text-white text-black mr-1'
                          icon='coins'
                        />
                        <div className='font-bold'>{`${price}.99/G`}</div>
                      </div>
                      <Button text='Order' className='p-1 m-1' />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

Browse.getInitialProps = ({ query }) => {
  return {
    slug: query.slug as string,
  };
};

export default withApollo({ ssr: true })(Browse);
