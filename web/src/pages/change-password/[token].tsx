import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputField, ButtonField } from '../../components/htmlElements/';
import { Wrapper } from '../../components/Wrapper';
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../../generated/graphql';
import { toErrorMap } from '../../utils/helpers/toErrorMap';
import withApollo from '../../utils/apollo/withApollo';
import NextLink from 'next/link';
import { FormHeader } from '../../components/utils/FormHeader';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper>

      <FormHeader text="Change Password"/>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              newPassword: '',
            }}
            onSubmit={async ({ newPassword }, { setErrors }) => {
              const response = await changePassword({
                variables: { token, newPassword },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: data?.changePassword.user,
                    },
                  });
                },
              });
              if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(
                  response.data.changePassword.errors
                );
                if ('token' in errorMap) {
                  setTokenError(errorMap.token);
                }
                setErrors(errorMap);
              } else if (response.data?.changePassword.user) {
                // worked
                router.push('/');
              }
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form className='space-y-6'>
                <InputField
                  name='newPassword'
                  placeholder='New password'
                  label='New password'
                  type='password'
                />

                {tokenError ? (
                  <div className='flex justify-between font-medium'>
                    <div className=' text-red-600'>{tokenError}</div>
                    <div>
                      <NextLink href='/forgot-password'>
                        <a className='text-indigo-600 hover:text-indigo-500'>
                          Click here to get a new one
                        </a>
                      </NextLink>
                    </div>
                  </div>
                ) : null}

                <ButtonField
                  loading={isSubmitting}
                  text='Login'
                  type='submit'
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withApollo({ ssr: false })(ChangePassword);
