import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FilterUserServiceQuery } from 'src/generated/graphql';
import useServiceFilterStore from 'src/store/ServiceFilterStore';
import { getRandomBetween } from 'src/utils';
import { isServer } from 'src/utils/helpers/isServer';
import { Button } from '../htmlElements';
import gray from '/public/gray.png';


interface UserServicesProps {
  data: FilterUserServiceQuery | undefined;
  fetchMore: (variables: any) => Promise<any>;
}

export const UserServices: React.FC<UserServicesProps> = ({
  data,
  fetchMore,
}) => {
  const router = useRouter();
  const { filterQuery, setCursor } = useServiceFilterStore();

  const handleScroll = async () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    // console.log(data?.filterUserService.hasMore);
    if (bottom && data?.filterUserService.hasMore) {
      setCursor(
        data?.filterUserService.userService[
          data.filterUserService.userService.length - 1
        ].createdAt
      );
      await fetchMore({
        variables: filterQuery,
      });
    }
  };

  useEffect(() => {
    !isServer() &&
      window.addEventListener('scroll', handleScroll, {
        passive: true,
      });

    return () => {
      !isServer() && window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  return (
    <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 text-white'>
      {data &&
        data?.filterUserService?.userService.map(
          ({ user, price, per, serviceId }, index) => (
            <div key={index} className='bg-white dark:bg-dark flex flex-col' onClick={() => router.push(`/service/${serviceId}`)}>
              <img
                src={user.images?.length ? user.images[0].url : gray.src}
                className='h-auto'
              />

              <div className='p-2' >
                <div className='flex items-center justify-between w-full'>
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
                  <img
                    src={`data:image/jpeg;base64,${user.country?.flag}`}
                    alt={user.country?.name}
                    title={user.country?.name}
                    className='h-4'
                  />
                </div>
                <div className='flex items-center divide-x-2 divide-y-8 '>
                  <FontAwesomeIcon
                    size='xs'
                    className='dark:text-yellow-500 text-black mr-1'
                    icon='star'
                  />
                  {`${getRandomBetween(3, 5)}.${getRandomBetween(
                    10,
                    99
                  )} (${getRandomBetween(0, 200)})`}
                </div>
                <hr className='border-lightGray my-1' />
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <FontAwesomeIcon
                      size='xs'
                      className='dark:text-white text-black mr-1'
                      icon='coins'
                    />
                    <div className='font-bold'>{`${price.toFixed(
                      2
                    )} / ${per}`}</div>
                  </div>
                  <Button
                    text='Order'
                    className='p-1 m-1'
                    
                  />
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
};
