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
dayjs.extend(relativeTime);

// dateNow.diff(user.lastOnline, 'day') * -1 < 2

const Browse: NextPage<{ slug: string }> = ({ slug }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { filterQuery, filterInit } = useServiceFilterStore();
  useEffect(() => {
    filterInit({ slug, limit: 20, cursor: undefined });
  }, []);

  const { data } = useGetServicesQuery();
  const {
    data: userService,
    fetchMore,
    refetch,
  } = useFilterUserServiceQuery({ variables: filterQuery });

  const service = data?.getServices?.find((service) => service.slug === slug);
  const images = service?.images?.filter((image) => image.width > 1200);

  // console.log(userService?.filterUserService?.userService.length, filterQuery);

  return (
    <Wrapper navbar fluid>
      {/* <div style={{ position: 'absolute', width: '100%', height: '48vw' }}>
        <Image
          className='img-fade opacity-40'
          src={
            images?.length
              ? images[getRandomBetween(0, images.length)].url
              : gray.src
          }
          layout='fill'
          objectFit='cover'
        />
      </div> */}
      <div className='flex justify-end md:hidden right-3 z-10'>
        <Button
          text='service filter'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
      <div className='flex h-full w-full'>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          data={data}
          refetch={refetch}
        />

        <div className='flex flex-col w-full overflow-x-hidden overflow-y-auto mb-14"'>
          <div className='flex flex-col w-full h-full text-gray-900 text-xl border-dashed'>
            <h1 className='text-white text-4xl font-bold mb-5 inline-block'>
              {service?.name}
            </h1>
            <div className='flex items-center'>
              <Filter />
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
