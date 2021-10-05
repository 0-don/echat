// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';
import Image from 'next/image';
import transparent from '/public/transparent.png';
import React, { useEffect, useState } from 'react';
import { getRandomBetween } from 'src/utils';
import { OrderModal } from 'src/components/order/OrderModal';
import { useGetUserServiceQuery } from 'src/generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gray from '/public/gray.png';
import dayjs from 'dayjs';
import router from 'next/router';

const ServiceDetail: NextPage<{ id: number }> = ({ id }) => {
  const [bgImage, setBgImage] = useState<string | undefined>();
  const { data } = useGetUserServiceQuery({
    variables: { id },
  });
  const user = data?.getUserService?.user;
  const service = data?.getUserService?.service;
  const userService = data?.getUserService;
  const userServices = data?.getUserService?.user?.services;

  const images = service?.images?.filter((image) => image.width > 1200);
  const profileImage = user?.images?.find(
    (image) => image.type === 'profile'
  )?.url;

  const reviews = data?.getUserService?.user.target;

  const averageScore = reviews?.length
    ? (
        reviews.reduce((total, next) => total + next.score, 0) / reviews.length
      ).toFixed(1)
    : '0.0';
  const served = reviews?.length ?? 0;
  const recommend = reviews?.filter((review) => review.recommend).length ?? 0;

  useEffect(() => {
    images?.length &&
      setBgImage(images[getRandomBetween(0, images.length)].url);
  }, [images]);

  return (
    <Wrapper navbar fluid className='relative'>
      <div style={{ position: 'relative', width: '100%', height: '40vw' }}>
        <Image
          className='img-fade opacity-40'
          src={bgImage ?? transparent.src}
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className='container max-auto max-w-7xl mx-auto absolute top-0 left-0 right-0 dark:text-white text-black'>
        <h1 className='mt-5 text-4xl font-medium'>{service?.name}</h1>

        <div className='flex justify-between w-full items-center mt-3'>
          <div className='flex space-x-1 items-center'>
            <FontAwesomeIcon size='lg' icon='coins' />
            <p>
              <span className='text-2xl'>{userService?.price}</span>/
              {userService?.per}
            </p>
          </div>
          <div className='flex space-x-5'>
            <OrderModal data={data} />
            <button className='big-button'>chat</button>
          </div>
        </div>

        <div className='flex w-full mt-5 space-x-3 items-start'>
          <div className='bg-white dark:bg-dark dark:text-white shadow rounded-lg p-3 px-5 w-full'>
            <div className='flex flex-col md:flex-row  items-center'>
              <div className='flex flex-col space-x-1'>
                <h3 className='font-medium'>Average Score</h3>
                <div className='flex items-center space-x-2.5 w-full'>
                  <p>
                    <span className='text-5xl'>{averageScore}</span>
                    <span className='text-4xl'>/</span>
                    <span className='text-3xl'>5.0</span>
                  </p>
                  <div className='flex space-x-1 mb-0.5 w-full'>
                    <ReactStars
                      count={5}
                      value={Number(averageScore)}
                      size={36}
                      isHalf={true}
                      readonly={true}
                      edit={false}
                      emptyIcon={<i className='far fa-star'></i>}
                      halfIcon={<i className='fa fa-star-half-alt'></i>}
                      fullIcon={<i className='fa fa-star'></i>}
                      activeColor='#eab308'
                    />
                  </div>
                </div>
              </div>

              <div className='flex mt-3 md:mt-0'>
                <div className='md:border-r border-gray-500 md:ml-10 md:mr-3'></div>

                <div>
                  <h3 className='font-medium'>Served</h3>
                  <p className='text-5xl'>{served}</p>
                </div>

                <div className='border-r border-gray-500 ml-3 md:ml-10 mr-3'></div>

                <div>
                  <h3 className='font-medium'>Recomended</h3>
                  <p className='text-5xl'>{recommend}</p>
                </div>
              </div>

              <div className='md:h-16 border-r border-gray-500 ml-3 md:ml-10 mr-3'></div>
            </div>
          </div>

          <div className='flex flex-col bg-white dark:bg-dark w-96 rounded-lg'>
            <div
              style={{ position: 'relative', width: '100%', height: '200px' }}
            >
              <Image
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
                layout='fill'
                objectFit='cover'
                className='rounded-t-lg'
                src={profileImage ?? gray.src}
              />
            </div>
            <div className='p-2'>
              <div className='flex items-center justify-between w-full'>
                <h1
                  className='text-xl font-semibold hover:text-purple cursor-pointer'
                  onClick={() => router.push(`/user/${user?.id}`)}
                >
                  {user?.username}
                </h1>
              </div>
              <div className='flex flex-col text-sm text-gray-300'>
                <p>
                  Languages:{' '}
                  {user?.languages?.map((lang) => lang.name).join(' / ')}
                </p>
                <p>Age: {dayjs(new Date()).diff(dayjs(user?.age), 'years')}</p>
              </div>
              <hr className='border-lightGray my-1' />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(ServiceDetail);
