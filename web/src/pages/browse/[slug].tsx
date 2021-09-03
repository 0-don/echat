import React, { useState } from 'react';
import withApollo from 'src/utils/apollo/withApollo';
import { Wrapper } from 'src/components/Wrapper';
import { Sidebar } from 'src/components/utils/Sidebar';
import {
  useFilterUserServiceQuery,
  useGetServicesQuery,
} from 'src/generated/graphql';
import gray from '/public/gray.png';
import { NextPage } from 'next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'src/components/htmlElements';

import { getRandomBetween } from 'src/utils';
import Image from 'next/image';

{
  /* <span
  className={`${
    dateNow.diff(user.lastOnline, 'day') * -1 < 2
      ? 'bg-green-500'
      : 'bg-gray-500'
  } h-4 w-4 rounded-full mr-1`}
/>; */
}

dayjs.extend(relativeTime);

const Browse: NextPage<{ slug: string }> = ({ slug }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = useGetServicesQuery();
  const {
    data: userService,
    loading: userServiceLoading,
    fetchMore,
    variables,
  } = useFilterUserServiceQuery({
    variables: { limit: 10, cursor: null, slug },
  });

  if (!data) {
    return null;
  }

  const service = data?.getServices?.find((service) => service.slug === slug);
  const images = service?.images?.filter((image) => image.width > 1200);

  return (
    <Wrapper navbar className=''>
      <div className='relative'>
        <Image
          className='img-fade absolute w-full object-cover opacity-40 mb-1'
          width={'100%'}
          height={'100%'}
          layout='responsive'
          src={
            images?.length
              ? images[getRandomBetween(0, images.length)].url
              : gray.src
          }
          alt=''
        />
        <div className='flex justify-end md:hidden absolute top-5 right-3 z-10'>
          <Button
            text='service filter'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
        <div className='flex w-full antialiased dark:text-light absolute top-5'>
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            data={data}
          />
          <div className='xl:mx-16'>
            <h1 className='text-white text-4xl font-bold mb-5 inline-block'>
              {service?.name}
            </h1>
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white'>
              {!userServiceLoading &&
                userService?.filterUserService?.userService.map(
                  ({ user, price }, index) => (
                    <div
                      key={index}
                      className='bg-white dark:bg-dark flex flex-col'
                    >
                      <img
                        src={
                          user.images?.length ? user.images[0].url : gray.src
                        }
                        className='h-auto'
                      />

                      <div className='p-2'>
                        <div className='flex items-center'>
                          <span
                            className={`${
                              index % 2 == 0 ? 'bg-green-500' : 'bg-gray-500'
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
                          {`${index}.99 (100)`}
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
                  )
                )}
              {
                <Button
                  text='more'
                  onClick={async () => {
                    await fetchMore({
                      variables: {
                        limit: variables?.limit,
                        cursor:
                          userService?.filterUserService.userService[
                            userService.filterUserService.userService.length - 1
                          ].createdAt,
                      },
                    });
                  }}
                />
              }
            </div>
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

export default withApollo({ ssr: false })(Browse);
