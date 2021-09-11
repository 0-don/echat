import React, { useEffect, useRef, useState } from 'react';
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
  const myRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | undefined | boolean>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { filterQuery, filterInit, setCursor } = useServiceFilterStore();
  useEffect(() => {
    filterInit({ slug, limit: 20, cursor: undefined });
  }, []);

  const { data } = useGetServicesQuery();
  const {
    data: userService,
    fetchMore,
    refetch,
  } = useFilterUserServiceQuery({ variables: filterQuery });

  const onScroll = async () => {
    const bottom =
      myRef.current &&
      parseInt(myRef.current.scrollHeight - myRef.current.scrollTop + '') ===
        myRef.current.clientHeight;

    if (bottom && userService?.filterUserService.hasMore) {
      const cursor =
        userService?.filterUserService?.userService[
          userService.filterUserService?.userService.length - 1
        ].createdAt;
      await fetchMore({
        variables: {
          ...filterQuery,
          cursor,
        },
      });
      setCursor(cursor);
    }
  };

  const service = data?.getServices?.find((service) => service.slug === slug);
  const images = service?.images?.filter((image) => image.width > 1200);
  useEffect(() => {
    setSrc(
      images &&
        images?.length > 0 &&
        images[getRandomBetween(0, images.length)].url
    );
  }, []);

  return (
    <Wrapper navbar fluid className='relative'>
      <div style={{ position: 'relative', width: '100%', height: '48vw' }}>
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
      </div>

      <div className='flex h-full w-full absolute top-0'>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          data={data}
          refetch={refetch}
        />

        <div
          className='flex flex-col w-full overflow-x-hidden overflow-y-auto lg:px-5'
          ref={myRef}
          onScroll={onScroll}
        >
          <div className='flex flex-col w-full h-full text-gray-900 text-xl mt-5'>
            <div className='flex justify-between w-full items-center '>
              <h1 className='text-white text-4xl font-bold mb-5 inline-block'>
                {service?.name}
              </h1>
              <div className='md:hidden'>
                <Button
                  text='services'
                  icon='bars'
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                />
              </div>
            </div>

            <div className='flex items-center'>
              <Filter />
            </div>
            <UserServices data={userService} />
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
