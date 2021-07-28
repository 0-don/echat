import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Wrapper } from '../components/Wrapper';
import  withApollo  from '../utils/apollo/withApollo';
import { InputField, ButtonField } from '../components/htmlElements/';
import { useForgotPasswordMutation } from '../generated/graphql';
import { FormHeader } from '../components/utils/';

const ForgotPassword: React.FC = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper navbar>

      <FormHeader text="Reset your Password"/>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={async ({ email }, { setErrors }) => {
              await forgotPassword({ variables: { email } });
              setComplete(true);
            }}
          >
            {({ values, handleChange, isSubmitting }) =>
              complete ? (
                <div>
                  if an account with that email exists, we sent you can email
                </div>
              ) : (
                <Form className='space-y-6'>
                  <InputField
                    name='email'
                    placeholder='email'
                    type='email'
                    label='Email'
                  />
                <ButtonField
                  loading={isSubmitting}
                  text='Login'
                  type='submit'
                />
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
