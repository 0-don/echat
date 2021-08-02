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
import { ImageSection } from './ImageSection';

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
      <Formik
        initialValues={{
          username: user.me?.username || '',
          description: user.me?.description || '',
          age: user.me?.age || AGES[0].id,
          gender: user.me?.gender || GENDERS[0].name,
          country: user.me?.country || countries[0].name,
          languages: userLanguage || [languages[0]],
          discord: user.me?.discord || '',
          twitter: user.me?.twitter || '',
          facebook: user.me?.facebook || '',
          snapchat: user.me?.snapchat || '',
          instagram: user.me?.instagram || '',
          twitch: user.me?.twitch || '',
          steam: user.me?.steam || '',
          tiktok: user.me?.tiktok || '',
        }}
        onSubmit={async (values, { setErrors }) => {
          await updateMe({
            variables: { options: values },
            refetchQueries: [{ query: MeDocument }],
          });
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <>
            <Form className='space-y-6'>
              <div className='bg-white dark:bg-gray-800 dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                <h1 className='text-gray-900 dark:text-white mb-3'>Profile</h1>
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
                            fieldName='country'
                            values={values.country}
                            list={countries}
                            setFieldValue={setFieldValue}
                          />
                        )}
                      </div>

                      <div className='w-1/3 ml-2 mr-2'>
                        <DropdownField
                          fieldName='gender'
                          values={values.gender}
                          list={GENDERS}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                      <div className='w-1/3 ml-2'>
                        <DropdownField
                          fieldName='age'
                          values={values.age}
                          list={AGES}
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </div>
                    {!loading && (
                      <DropdownField
                        fieldName='languages'
                        values={values.languages}
                        list={languages}
                        setFieldValue={setFieldValue}
                      />
                    )}
                  </div>
                </div>
              </div>

              <ImageSection />

              <div className='bg-white dark:bg-gray-800 dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                <h1 className='text-gray-900 dark:text-white mb-3'>
                  Social Media
                </h1>
                <div className='flex'>
                  <div className='w-6/12 p-2'>
                    <InputField
                      name='discord'
                      value={values.discord}
                      label='Discord username'
                      icon='discord'
                    />
                    <InputField
                      name='facebook'
                      value={values.facebook}
                      label='Facebook username'
                      icon='facebook'
                    />
                    <InputField
                      name='instagram'
                      value={values.instagram}
                      label='Instagram username'
                      icon='instagram'
                    />
                    <InputField
                      name='steam'
                      value={values.steam}
                      label='Steam username'
                      icon='steam'
                    />
                  </div>
                  <div className='w-6/12 p-2'>
                    <InputField
                      name='twitter'
                      value={values.twitter}
                      label='Twitter Username'
                      icon='twitter'
                    />
                    <InputField
                      name='snapchat'
                      value={values.snapchat}
                      label='Snapchat Username'
                      icon='snapchat'
                    />
                    <InputField
                      name='twitch'
                      value={values.twitch}
                      label='Twitch Username'
                      icon='twitch'
                    />
                    <InputField
                      name='tiktok'
                      value={values.tiktok}
                      label='TikTok Username'
                      icon='tiktok'
                    />
                  </div>
                </div>
              </div>
              <ButtonField loading={isSubmitting} text='Save' type='submit' />
            </Form>
          </>
        )}
      </Formik>
    );
  } else {
    return <Loading />;
  }
};
