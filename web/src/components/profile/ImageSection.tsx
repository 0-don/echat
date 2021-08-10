import {
  useDeleteImageMutation,
  useUserImagesQuery,
} from 'src/generated/graphql';
// import { isServer } from 'src/utils/helpers/isServer';
import { FilesUpload } from '../htmlElements';
import gray from '/public/gray.png';
import { TrashIcon } from '@heroicons/react/outline';

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
        <h1 className='text-gray-900 dark:text-white mb-3 '>Images</h1>
        <div>
          <div>
            <img
              className='h-32  w-full object-center object-cover lg:h-48'
              src={!loading && cover?.length ? cover![0].url : gray.src}
            />
          </div>
          <div className='mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-center -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
              <img
                className='h-24 w-24 rounded-full ring-4  object-cover ring-white dark:ring-indigo-600  sm:h-32 sm:w-32'
                src={!loading && profile?.length ? profile![0].url : gray.src}
              />
            </div>
          </div>
        </div>

        <div className='flex m'>
          <div className='w-6/12'>
            <FilesUpload type='profile' />
          </div>
          <div className='w-6/12'>
            <FilesUpload type='cover' />
          </div>
        </div>
        <FilesUpload type='secondary' multiple={true} />

        <div className='flex justify-center flex-wrap mt-2'>
          {!loading &&
            secondary?.map(({ id, __typename, publicId, url }) => (
              <div key={url} className='relative'>
                <img className='h-24 mr-2 shadow-2xl' src={url} />
                <TrashIcon
                  className='absolute top-0 right-0 mr-2 text-indigo-700 h-5 w-5 hover:text-white'
                  onClick={async () => {
                    await deleteImage({
                      variables: { publicId },
                      update(c) {
                        const normalizedId = c.identify({ id, __typename });
                        c.evict({ id: normalizedId });
                        c.gc();
                      },
                    });
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
