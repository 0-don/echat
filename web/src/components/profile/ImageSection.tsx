import {
  useDeleteImageMutation,
  useUserImagesQuery,
} from 'src/generated/graphql';
// import { isServer } from 'src/utils/helpers/isServer';
import { FilesUpload } from '../htmlElements';

interface ImageSectionProps {}

export const ImageSection: React.FC<ImageSectionProps> = ({}) => {
  const { data, loading } = useUserImagesQuery();
  const [deleteImage] = useDeleteImageMutation();

  const cover = data?.userImages?.filter((cover) => cover.type === 'cover');
  const profile = data?.userImages?.filter(
    (profile) => profile.type === 'profile'
  );
  const secondary = data?.userImages?.filter(
    (secondary) => secondary.type == 'secondary'
  );

  return (
    <>
      <div className='bg-white dark:bg-gray-800 shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <h1 className='text-4xl text-gray-900 dark:text-white mb-3 '>Images</h1>
        <div>
          <div>
            <img
              className='h-32 w-full object-cover lg:h-48'
              src={
                !loading && cover?.length
                  ? cover![0].url
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/1200px-Solid_grey.svg.png'
              }
              alt=''
            />
          </div>
          <div className='mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-center -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
              <img
                className='h-24 w-24 rounded-full ring-4 ring-white dark:ring-indigo-600  sm:h-32 sm:w-32'
                src={
                  !loading && profile?.length
                    ? profile![0].url
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/1200px-Solid_grey.svg.png'
                }
                alt=''
              />
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className='w-6/12'>
            <FilesUpload type='profile' />
          </div>
          <div className='w-6/12'>
            <FilesUpload type='cover' />
          </div>
        </div>
        <FilesUpload type='secondary' multiple={true} />

        <div className='flex flex-wrap'>
          {!loading &&
            secondary?.map(({ id, __typename, publicId, url }) => (
              <div key={url} className='relative'>
                <img style={{ height: '100px' }} src={url} alt='dummy-image' />
                <button
                  type='button'
                  className='absolute top-0 bg-blue-500 text-white p-2 rounded hover:bg-blue-800 m-2'
                  onClick={async () => {
                    await deleteImage({
                      variables: { publicId },
                      update(cache, { data }) {
                        const normalizedId = cache.identify({
                          id,
                          __typename,
                        });

                        cache.evict({ id: normalizedId });
                        cache.gc();
                      },
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
