import { Form, Formik } from 'formik';
import React from 'react';
import { AGES, GENDERS } from 'src/constants';
import {
  useAllLangAllCountQuery,
  useUpdateMeMutation,
} from 'src/generated/graphql';
import { ButtonField, InputField, TextAreaField } from '../htmlElements';
import { DropdownField } from '../htmlElements/';

import { useApolloClient } from '@apollo/client';
import { MeDocument, MeQuery } from 'src/generated/graphql';
import { Loading } from '../utils';

interface ProfileSectionProps {}

export const ProfileSection: React.FC<ProfileSectionProps> = ({}) => {
  const { cache } = useApolloClient();
  let user = cache.readQuery<MeQuery>({
    query: MeDocument,
  });

  const userLanguage = user?.me?.languages?.map((lang) => ({
    id: lang.id,
    name: lang.name,
  }));

  const { data, loading } = useAllLangAllCountQuery();
  const [updateMe] = useUpdateMeMutation();

  const languages = data?.allLanguages.map((item) => {
    return { id: item.id, name: item.name };
  });
  const countries = data?.allCountries.map((item) => {
    return { id: item.id, name: item.name };
  });

  if (languages && languages.length && countries && countries.length && user) {
    return (
      <div className='bg-white dark:bg-gray-800 dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
        <h1 className='text-gray-900 dark:text-white mb-3'>Profile</h1>
        <Formik
          initialValues={{
            username: user.me?.username || '',
            description: user.me?.description || '',
            age: user.me?.age || AGES[0].id,
            gender: user.me?.gender || GENDERS[0].name,
            country: user.me?.country || countries[0].name,
            languages: userLanguage || [languages[0]],
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            await updateMe({
              variables: { options: values },
            });
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className='space-y-6'>
              <div className='flex'>
                <div className='w-6/12 p-2'>
                  <InputField
                    name='username'
                    value={values.username}
                    placeholder='username'
                    label='Username'
                  />
                  <TextAreaField
                    name='description'
                    value={values.description}
                    placeholder='description'
                    label='Description'
                  />
                </div>
                <div className='w-6/12 p-2'>
                  <div className='flex'>
                    <div className='w-1/3 mr-2'>
                      {!loading && (
                        <DropdownField
                          name='country'
                          values={values.country}
                          list={countries}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    </div>
                    <div className='w-1/3 ml-2 mr-2'>
                      <DropdownField
                        name='gender'
                        values={values.gender}
                        list={GENDERS}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div className='w-1/3 ml-2'>
                      <DropdownField
                        name='age'
                        values={values.age}
                        list={AGES}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                  {!loading && (
                    <DropdownField
                      name='languages'
                      values={values.languages}
                      list={languages}
                      setFieldValue={setFieldValue}
                    />
                  )}
                </div>
              </div>

              <ButtonField loading={isSubmitting} text='Save' type='submit' />
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return <Loading />;
  }
};
