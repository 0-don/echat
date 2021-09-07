import React, { useEffect, useState } from 'react';
import withApollo from 'src/utils/apollo/withApollo';
import { Wrapper } from 'src/components/Wrapper';
import { Sidebar } from 'src/components/utils/Sidebar';
import {
  useFilterUserServiceQuery,
  useGetServicesQuery,
} from 'src/generated/graphql';

import { NextPage } from 'next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button } from 'src/components/htmlElements';
import gray from '/public/gray.png';
import { getRandomBetween } from 'src/utils';
import Image from 'next/image';
import { Filter } from 'src/components/browse/Filter';
import useServiceFilterStore from 'src/store/ServiceFilterStore';
import { UserServices } from 'src/components/browse/UserServices';
import router from 'next/router';

dayjs.extend(relativeTime);
{
  /* <span
  className={`${
    dateNow.diff(user.lastOnline, 'day') * -1 < 2
      ? 'bg-green-500'
      : 'bg-gray-500'
  } h-4 w-4 rounded-full mr-1`}
/>; */
}

const Browse: NextPage<{ slug: string }> = ({ slug }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { filterQuery, filterInit } = useServiceFilterStore();

  useEffect(() => {
    filterInit({ slug, limit: 20 });
  }, []);

  const { data } = useGetServicesQuery();
  const {
    data: userService,
    fetchMore,
    refetch,
  } = useFilterUserServiceQuery({ variables: filterQuery });

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
            refetch={refetch}
          />

          <div className='xl:mx-8'>
            <h1 className='text-white text-4xl font-bold mb-5 inline-block'>
              {service?.name}
            </h1>
            <div className='flex items-center'>
              <Filter slug={slug} />
            </div>
            <UserServices data={userService} fetchMore={fetchMore} />
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
