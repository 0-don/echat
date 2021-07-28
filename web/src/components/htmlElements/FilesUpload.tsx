import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotographIcon } from '@heroicons/react/outline';
import {
  useMultipleUploadMutation,
  UserImagesDocument,
  UserImagesQuery,
} from '../../generated/graphql';
import { Loading, ProgressBar } from '../utils';

type FilesUploadProps = {
  type: string;
  multiple?: boolean;
};

export const FilesUpload: React.FC<FilesUploadProps> = ({
  type,
  multiple = false,
}) => {
  const [progress, setProgress] = useState<number>(0);

  
  const [multipleUpload, { loading }] = useMultipleUploadMutation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    accept: 'image/*',
    onDrop: async (files) => {
      await multipleUpload({
        variables: { files, type },
        context: {
          fetchOptions: {
            useUpload: true,
            onProgress: (ev: ProgressEvent) => {
              const load = Math.floor((100 * ev.loaded) / ev.total);

              setProgress(load);
              if (load === 100) setProgress(0);
            },
            onAbortPossible: (_: any) => {},
          },
        },
        update(cache, { data }) {
          let imageData = cache.readQuery<UserImagesQuery>({
            query: UserImagesDocument,
          });
          cache.modify({
            fields: {
              userImages(existingImages, { readField }) {
                const newImage = {
                  __ref: `${data!.multipleUpload![0].__typename}:${
                    data!.multipleUpload![0].id
                  }`,
                };

                if (
                  (imageData && type === 'profile') ||
                  (imageData && type === 'cover')
                ) {
                  const image = imageData?.userImages?.find(
                    (i) => i.type === type
                  );

                  if (image) {
                    cache.evict({ id: `${image.__typename}:${image.id}` });
                    cache.gc();
                    return [
                      ...existingImages.filter((i: any) => {
                        return image.id !== readField('id', i);
                      }),
                      newImage,
                    ];
                  }

                  return existingImages;
                } else {
                  return [...existingImages, newImage];
                }
              },
            },
          });
        },
      });
    },
  });

  return (
    <div className='m-5 bg-white dark:bg-gray-800 shadow px-4 py-5 sm:rounded-lg sm:p-6'>
      <label className='block text-sm font-medium text-gray-900 dark:text-white'>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </label>
      <div
        {...getRootProps()}
        className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 dark:border-indigo-600 border-dashed rounded-md'
      >
        {!progress && loading ? (
          <div>
            <h1 className='text-gray-700 text-center'>Almost There</h1>
            <Loading />
          </div>
        ) : progress && loading ? (
          <ProgressBar progress={progress} />
        ) : (
          <div className='space-y-1 text-center'>
            <PhotographIcon
              className='h-12 w-12 m-auto text-black dark:text-white bg-white dark:bg-gray-800'
              aria-hidden='true'
            />
            <div className='flex text-sm text-gray-600'>
              <label
                htmlFor='file-upload'
                className='relative cursor-pointer  rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <div className='rounded-full py-3 px-6 bg-gray-200 dark:bg-indigo-600'>
                    <p className='text-gray-600 bg-gray-200 dark:bg-indigo-600 dark:text-black  '>
                      Change {type.charAt(0).toUpperCase() + type.slice(1)}
                    </p>
                  </div>
                )}
              </label>
            </div>
            <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};
