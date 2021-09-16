import React from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import Image from 'next/image';
import { GetUserQuery } from 'src/generated/graphql';
import transparent from '/public/transparent.png';

interface AlbumProps {
  data: GetUserQuery | undefined;
}

export const Album: React.FC<AlbumProps> = ({ data }) => {
  const images = data?.getUser?.images?.filter(
    (image) => image.type === 'secondary'
  );

  return (
    <SRLWrapper>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5'>
        {images?.map((image) => (
          <a href={image.url} key={image.id}>
            <Image
              width={'100%'}
              height={'100%'}
              layout='responsive'
              objectFit='cover'
              className='rounded-xl'
              src={image.url ?? transparent.src}
            />
          </a>
        ))}
      </div>
    </SRLWrapper>
  );
};
