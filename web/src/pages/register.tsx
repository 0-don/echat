import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { InputField, Button } from '../components/htmlElements/';
import { FormHeader } from '../components/utils/FormHeader';
import { Wrapper } from '../components/Wrapper';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/helpers/toErrorMap';
import withApollo from '../utils/apollo/withApollo';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Wrapper navbar>
      <FormHeader text='Register your account' />

      <div className='mt-8  sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white dark:text-white dark:bg-dark py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: { options: values },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: data?.register.user,
                    },
                  });
                },
              });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data?.register.user) {
                router.push('/');
              }
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form className='space-y-4'>
                <InputField
                  name='username'
                  placeholder='username'
                  label='Username'
                  autoComplete='on'
                />
                <InputField
                  name='email'
                  placeholder='email'
                  label='Email'
                  type='email'
                  autoComplete='on'
                />
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type='password'
                  autoComplete='on'
                />
                <Button loading={isSubmitting} text='login' type='submit' />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);
