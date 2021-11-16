import { Wrapper } from '../components/Wrapper';
import withApollo from '../utils/apollo/withApollo';
import homeAlt from '/public/home-alt.jpg';
import rig from '/public/rig.svg';
import Image from 'next/image';
import { Button } from 'src/components/htmlElements';
import { useRouter } from 'next/router';
import { useMeQuery } from 'src/generated/graphql';

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const router = useRouter();
  const { data } = useMeQuery();

  return (
    <Wrapper navbar fluid scrollbar className='relative'>
      <div style={{ position: 'relative', width: '100%', height: '48vw' }}>
        <Image
          className='img-fade dark:opacity-40 opacity-100'
          src={homeAlt.src}
          layout='fill'
          objectFit='cover'
          priority={true}
        />
      </div>

      <div className='flex h-full w-full absolute top-0 text-white px-2 md:px-0'>
        <div className='mx-auto container-lg flex'>
          <div className='flex flex-wrap items-center md:mb-24'>
            <div className='w-full md:w-1/2 text-center md:text-left z-20 dark:text-white text-dark'>
              <h1 className='text-5xl font-bold'>Find a Friend & Game On!</h1>
              <p className='text-2xl mt-5'>
                Echat is the social gaming community where you can connect, chat
                and play with gamers from all over the world.
              </p>
              <div className='flex mt-5 space-x-10 justify-between md:justify-start'>
                <Button
                  icon='search'
                  text='browse'
                  className='text-lg'
                  onClick={() => router.push('/browse/league-of-legends')}
                />
                {!data?.me && (
                  <button
                    className='p-2 pl-5 pr-5 bg-transparent border-2 border-purple text-purple text-lg rounded-lg hover:bg-purple hover:text-gray-100 focus:border-4 focus:bg-purple-dark'
                    onClick={() => router.push('/register')}
                  >
                    register
                  </button>
                )}
              </div>
            </div>

            <div className='w-full md:w-1/2 mt-12 md:mt-0'>
              <div className='relative h-36'>
                <div className='rig'>
                  <Image
                    width={314}
                    height={232}
                    layout='fixed'
                    objectFit='cover'
                    className='rounded-full'
                    src={rig.src}
                  />
                </div>
                <div className='rig'>
                  <Image
                    width={314}
                    height={232}
                    layout='fixed'
                    objectFit='cover'
                    className='rounded-full'
                    src={rig.src}
                  />
                </div>
                <div className='rig'>
                  <Image
                    width={314}
                    height={232}
                    layout='fixed'
                    objectFit='cover'
                    className='rounded-full'
                    src={rig.src}
                  />
                </div>
                <div className='rig'>
                  <Image
                    width={314}
                    height={232}
                    layout='fixed'
                    objectFit='cover'
                    className='rounded-full'
                    src={rig.src}
                  />
                </div>
                <div className='rig'>
                  <Image
                    width={314}
                    height={232}
                    layout='fixed'
                    objectFit='cover'
                    className='rounded-full'
                    src={rig.src}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Index);
