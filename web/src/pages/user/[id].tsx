import { NextPage } from 'next';
import { useGetUserQuery } from 'src/generated/graphql';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';
import Image from 'next/image';
import transparent from '/public/transparent.png';

const UserDetail: NextPage<{ id: number }> = ({ id }) => {
  const { data } = useGetUserQuery({
    variables: { id },
  });
  const images = data?.getUser?.images;
  console.log(id, data);
  return (
    <Wrapper navbar fluid className='dark:text-white text-black relative'>
      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-0 left-0 right-0 mt-5'>
        <div className='flex justify-between items-start'>
          <div
            style={{ position: 'relative', width: '200px', height: '200px' }}
          >
            <Image
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
              layout='fill'
              objectFit='cover'
              src={
                images?.find((image) => image.type === 'profile')?.url ??
                transparent.src
              }
            />
          </div>
          <div
            style={{ position: 'relative', width: '200px', height: '200px' }}
          >
            <Image
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
              layout='fill'
              objectFit='cover'
              src={
                images?.find((image) => image.type === 'profile')?.url ??
                transparent.src
              }
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

UserDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(UserDetail);
