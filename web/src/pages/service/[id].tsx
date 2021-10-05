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
import { ImagePopup } from 'src/components/utils/ImagePopup';
import { AverageScore } from 'src/components/service/AverageScore';
import { UserColumn } from 'src/components/service/UserColumn';

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
          <AverageScore data={data} />
          <UserColumn data={data} />
        </div>
      </div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(ServiceDetail);
