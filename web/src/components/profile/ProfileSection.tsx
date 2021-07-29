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

interface ProfileSectionProps {}

export const ProfileSection: React.FC<ProfileSectionProps> = ({}) => {
  const { data, loading } = useAllLangAllCountQuery();
  const { cache } = useApolloClient();
  const [updateMe] = useUpdateMeMutation();

  const languages = data?.allLanguages.map((item) => {
    return { id: item.id, name: item.name };
  });
  const countries = data?.allCountries.map((item) => {
    return { id: item.id, name: item.name };
  });

  let user = cache.readQuery<MeQuery>({
    query: MeDocument,
  });

  // console.log(user?.me);

  return (
    <div className='bg-white dark:bg-gray-800 dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
      <Formik
        initialValues={{
          username: user?.me?.username || '',
          description: user?.me?.description || '',
          age: AGES.filter((age) => age.id == user?.me?.age) || [AGES[0]],
          gender: GENDERS.filter(
            (gender) => gender.name == user?.me?.gender
          ) || [GENDERS[0]],
          country:
            user?.me?.country?.length && countries?.length
              ? countries.filter((country) => country.name == user?.me?.country)
              : countries! && [countries[0]],
          languages: [],
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values.age[0]);
          await updateMe({
            variables: { options: values },
          });
        }}
      >
        {({ values, handleChange, isSubmitting, setFieldValue }) => (
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
                    {!loading && countries && (
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
                {!loading && languages && (
                  <DropdownField
                    name='languages'
                    values={values.languages}
                    list={languages}
                    setFieldValue={setFieldValue}
                    multiple={true}
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
};
