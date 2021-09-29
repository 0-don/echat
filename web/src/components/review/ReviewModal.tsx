import React, { useState } from 'react';
import { Modal } from 'src/components/htmlElements';

export const ReviewModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={async () => {
          setOpen(!open);
          // const { data } = await completeOrder({
          //   variables: { id, sellerId: seller?.id },
          //   refetchQueries: [{ query: GetBuyerOrdersDocument }],
          // });

          // data?.completeOrder.errors?.length &&
          //   setErrors(data?.completeOrder.errors);
        }}
        className='bg-lightGray hover:bg-purple rounded-xl px-2 py-0.5'
      >
        review
      </button>
      {/* <Button
        text='add service'
        icon='gamepad'
        onClick={() => setOpen(!open)}
      /> */}
      <Modal open={open} setOpen={setOpen}>
        <div className='inline-block align-bottom bg-white dark:bg-dark rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6'>
          <button></button>
          <h1>HJasd</h1>
        </div>
      </Modal>
    </>
  );
};
