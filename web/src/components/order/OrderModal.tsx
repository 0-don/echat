import React, { useState } from 'react';

import { Button, Modal } from 'src/components/htmlElements';

export const OrderModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button text='order' icon='star' onClick={() => setOpen(!open)} />
      <Modal open={open} setOpen={setOpen}>
        <div className='inline-block bg-white dark:bg-dark rounded-lg text-left transform transition-all dark:text-white text-black p-5'>
          <button></button>
          asdasd
        </div>
      </Modal>
    </>
  );
};
