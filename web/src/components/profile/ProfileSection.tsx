import { Form, Formik } from 'formik';
import React from 'react';
import { ButtonField, InputField, TextAreaField } from '../htmlElements';

interface ProfileSectionProps {}

export const ProfileSection: React.FC<ProfileSectionProps> = ({}) => {

  

  return (
    <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
      <Formik
        initialValues={{
          username: '',
          description: '',
        }}
        onSubmit={async (values, { setErrors }) => {}}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className='space-y-6'>
            <div className='flex'>
              <div className='w-6/12'>
                <InputField
                  name='username'
                  placeholder='username'
                  label='Username'
                />
                <TextAreaField
                  name='description'
                  placeholder='description'
                  label='Password'
                />
              </div>
            </div>

            <ButtonField loading={isSubmitting} text='Save' type='submit' />
          </Form>
        )}
      </Formik>
    </div>
  );
};
