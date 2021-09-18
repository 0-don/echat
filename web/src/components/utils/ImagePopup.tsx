import React, { useState } from 'react';
import { Modal } from 'src/components/htmlElements';

import Image, { ImageProps } from 'next/image';

type ImagePopupProps = ImageProps & {
  src: string;
};

export const ImagePopup: React.FC<ImagePopupProps> = ({ src, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image {...props} src={src} onClick={() => setOpen(!open)} />

      <Modal open={open} setOpen={setOpen}>
        <div className='dark:text-white text-black inline-block max-w-xl bg-white dark:bg-dark rounded-lg text-left transform rela'>
          <img src={src} />
        </div>
      </Modal>
    </>
  );
};
