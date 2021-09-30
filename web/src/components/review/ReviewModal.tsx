// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import React, { useState } from 'react';
import { Modal } from 'src/components/htmlElements';
import { useCreateReviewMutation } from 'src/generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const maxRating = 5;

interface ReviewModalProps {
  orderId: number;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ orderId }) => {
  const [open, setOpen] = useState(false);
  const [createReview] = useCreateReviewMutation();
  const [score, setScore] = useState(maxRating);
  const [recommend, setRecommend] = useState(true);
  const [review, setReview] = useState('');

  console.log(review);
  return (
    <>
      <button
        onClick={async () => {
          setOpen(!open);
        }}
        className='bg-lightGray hover:bg-purple rounded-xl px-2 py-0.5'
      >
        review
      </button>

      <Modal open={open} setOpen={setOpen}>
        <div className='dark:text-white inline-block align-bottom bg-white dark:bg-dark rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6'>
          <button></button>
          <div className='flex flex-col space-y-3'>
            <h1 className='text-2xl font-medium'>Service Review</h1>
            <p className='text-sm'>
              Please review on this service, after 72 hours, the order will be
              automatically recommended and given 5 stars.
            </p>
            <div className='flex items-center space-x-1'>
              <ReactStars
                count={5}
                onChange={setScore}
                value={5}
                size={36}
                isHalf={true}
                emptyIcon={<i className='far fa-star'></i>}
                halfIcon={<i className='fa fa-star-half-alt'></i>}
                fullIcon={<i className='fa fa-star'></i>}
                activeColor='#ffd700'
              />
              <h2 className='text-3xl mt-1 font-medium'>
                {score.toFixed(1)}/{maxRating.toFixed(1)}
              </h2>
            </div>
            <div className='flex space-x-5'>
              <FontAwesomeIcon
                size='4x'
                className={`${
                  !recommend ? 'opacity-100' : 'opacity-50'
                } dark:text-red-600 text-red-600 dark:hover:opacity-100`}
                icon={[`${!recommend ? 'fas' : 'far'}`, 'thumbs-down']}
                onClick={() => setRecommend(false)}
              />
              <FontAwesomeIcon
                size='4x'
                className={`${
                  recommend ? 'opacity-100' : 'opacity-50'
                } dark:text-green-700 text-green-700 dark:hover:opacity-100`}
                icon={[`${recommend ? 'fas' : 'far'}`, 'thumbs-up']}
                onClick={() => setRecommend(true)}
              />
            </div>
            <div className=''>
              <label
                htmlFor='Review'
                className='block my-1 text-sm font-medium text-gray-900 dark:text-gray-50'
              >
                Review
              </label>
              <div className='mt-1'>
                <textarea
                  id='Review'
                  onChange={(e) => setReview(e.target.value)}
                  className={`text-white w-full px-3 py-2 border rounded-md focus:outline-none dark:bg-dark-light dark:border-dark-light dark:hover:border-lightGray dark:focus:bg-dark-dark dark:focus:border-purple focus:border-purple`}
                />
              </div>
            </div>
            <div className='w-full flex justify-end'>
              <button
                style={{ backgroundColor: 'transparent' }}
                className='bg-tran big-button mr-5'
                onClick={() => setOpen(false)}
              >
                cancel
              </button>
              <button
                onClick={async () => {
                  await createReview({
                    variables: {
                      options: { orderId, score, recommend, review },
                    },
                  });
                }}
                className='big-button'
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
