import React, { useEffect, useState } from 'react';
import withApollo from 'src/utils/apollo/withApollo';
import { Wrapper } from 'src/components/Wrapper';
import { Sidebar } from 'src/components/utils/Sidebar';
import {
  useFilterUserServiceQuery,
  useGetAllServicesQuery,
} from 'src/generated/graphql';
import gray from '/public/gray.png';
import { NextPage } from 'next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'src/components/htmlElements';
import { Loading } from 'src/components/utils';

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
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, loading } = useGetAllServicesQuery();

  const { data: userService, loading: userServiceLoading } =
    useFilterUserServiceQuery({ variables: { slug } });

  if (!data || loading || userServiceLoading) {
    return <Loading />;
  }

  const images = data.getAllServices
    ?.find((service) => service.slug === slug)
    ?.images?.filter((image) => image.width > 1200);

  useEffect(() => {
    setRandomNumber(
      images?.length ? Math.floor(Math.random() * images.length) : 0
    );
  }, []);

  return (
    <Wrapper navbar className=''>
      <div className='flex justify-end md:hidden'>
        <Button
          text='service filter'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      <img
        className='absolute h-32 w-full object-cover lg:h-48 opacity-20 mb-1'
        src={images ? images[randomNumber].url : gray.src}
        alt=''
      />
      <div className='flex antialiased dark:text-light z-10'>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          data={data}
        />
        <div className='flex-1'>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-white'>
            {!userServiceLoading &&
              userService?.filterUserService?.map(({ user, price }, index) => (
                <div
                  key={index}
                  className='bg-white dark:bg-dark flex flex-col rounded-xl'
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
