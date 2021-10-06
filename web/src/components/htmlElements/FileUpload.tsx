import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotographIcon } from '@heroicons/react/outline';
import {
  UpsertUserService,
  useChangeUserserviceImageMutation,
  useMultipleUploadMutation,
} from '../../generated/graphql';
import { Loading, ProgressBar } from '../utils';
import { DocumentNode } from '@apollo/client';
import { useFormikContext } from 'formik';

type FilesUploadProps = {
  type: string;
  multiple?: boolean;
  query?: DocumentNode;
};

export const FilesUpload: React.FC<FilesUploadProps> = ({
  type,
  multiple = false,
  query,
}) => {
  const { setFieldValue } = useFormikContext<UpsertUserService>();
  const [progress, setProgress] = useState<number>(0);

  const [multipleUpload, { loading }] = useMultipleUploadMutation();
  const [changeUserserviceImage] = useChangeUserserviceImageMutation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    noClick: true,
    accept: 'image/*',
    onDrop: async (files) => {
   
      if (query) {
        await multipleUpload({
          variables: { files, type },
          refetchQueries: query ? [{ query }] : undefined,
          context: {
            hasUpload: true,
            fetchOptions: {
              useUpload: true,
              onProgress: (ev: ProgressEvent) => {
                const load = Math.floor((100 * ev.loaded) / ev.total);
                load === 100 ? setProgress(0) : setProgress(load);
              },
              onAbortPossible: (_: any) => {},
            },
          },
          // update(cache, { data }) {
          //   let imageData = cache.readQuery<UserImagesQuery>({
          //     query: UserImagesDocument,
          //   });
          //   cache.modify({
          //     fields: {
          //       userImages(existingImages: Image[], { readField }) {
          //         const newImage = {
          //           __ref: `${data!.multipleUpload![0].__typename}:${
          //             data!.multipleUpload![0].id
          //           }`,
          //         };

          //         const image = imageData?.userImages?.find(
          //           (i) => i.type === type
          //         );

          //         if (
          //           (imageData && type === 'profile' && image) ||
          //           (imageData && type === 'cover' && image)
          //         ) {
          //           cache.evict({ id: `${image.__typename}:${image.id}` });
          //           cache.gc();

          //           return [
          //             ...existingImages.filter(
          //               (i) => image.id !== readField('id', i)
          //             ),
          //             newImage,
          //           ];
          //         }

          //         return [...existingImages, newImage];
          //       },
          //     },
          //   });
          // },
        });
      } else {
        const url = await changeUserserviceImage({
          variables: { files },
          context: {
            hasUpload: true,
            fetchOptions: {
              useUpload: true,
              onProgress: (ev: ProgressEvent) => {
                const load = Math.floor((100 * ev.loaded) / ev.total);
                load === 100 ? setProgress(0) : setProgress(load);
              },
              onAbortPossible: (_: any) => {},
            },
          },
        });

        setFieldValue('image', url.data?.changeUserserviceImage);
      }
    },
  });

  return (
    <div className='shadow-xl sm:rounded-lg sm:p-6 m-1 text-gray-900 dark:text-white'>
      <label className='text-sm font-medium'>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </label>
      <div
        {...getRootProps()}
        className='mt-1 flex justify-center items-center px-6 pt-5 pb-6 h-32 border-2 dark:border-purple border-dashed rounded-md'
      >
        {!progress && loading ? (
          <div>
            <h1 className='text-center'>Almost There</h1>
            <Loading />
          </div>
        ) : progress && !loading ? (
          <ProgressBar progress={progress} />
        ) : (
          <div className='space-y-1 text-black dark:text-white text-center cursor-pointer'>
            <PhotographIcon className='h-12 w-12 m-auto' aria-hidden='true' />
            <label className='relative '>
              <input {...getInputProps()} />
              <p className='rounded-full text-sm text-white bg-dark-light dark:bg-purple dark:hover:bg-purple-dark hover:bg-purple '>
                {isDragActive
                  ? 'Drop the files here ...'
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </p>
            </label>
            <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};
