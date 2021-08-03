import { Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import {
  AGES,
  GENDERS,
  HOURS,
  COUNTRIES,
  LANGUAGES,
  SCHEDULES,
} from 'src/constants';
import {
  MeDocument,
  useMeQuery,
  useUpdateMeMutation,
} from 'src/generated/graphql';
import {
  ButtonField,
  InputField,
  SwitchField,
  TextAreaField,
} from '../htmlElements';
import { DropdownField } from '../htmlElements/';
import { Loading } from '../utils';
import { ImageSection } from './ImageSection';

interface ProfileSectionProps {}

export const ProfileSection: React.FC<ProfileSectionProps> = ({}) => {
  const [updateMe] = useUpdateMeMutation();

  const { data: user, loading } = useMeQuery();

  const userLanguage = user?.me?.languages?.map((lang) => ({
    id: lang.id,
    name: lang.name,
  }));

  const userSchedules = user?.me?.schedules?.map(
    ({ __typename, ...sched }) => ({
      ...sched,
      from: sched.from.toString(),
      to: sched.to.toString(),
    })
  );

  if (!loading && user) {
    return (
      <Formik
        initialValues={{
          username: user.me?.username || '',
          description: user.me?.description || '',
          age: user.me?.age || AGES[0].id,
          gender: user.me?.gender || GENDERS[0].name,
          country: user.me?.country || COUNTRIES[0].name,

          discord: user.me?.discord || '',
          twitter: user.me?.twitter || '',
          facebook: user.me?.facebook || '',
          snapchat: user.me?.snapchat || '',
          instagram: user.me?.instagram || '',
          twitch: user.me?.twitch || '',
          steam: user.me?.steam || '',
          tiktok: user.me?.tiktok || '',

          languages: userLanguage?.length ? userLanguage : [LANGUAGES[0]],
          schedules: userSchedules?.length ? userSchedules : SCHEDULES,
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          await updateMe({
            variables: { options: values },
            refetchQueries: [{ query: MeDocument }],
          });
        }}
      >
        {(formikProps) => (
          <>
            <Form className='space-y-6'>
              <div className='bg-white dark:bg-gray-800 dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                <h1 className='text-gray-900 dark:text-white mb-3'>Profile</h1>
                <div className='flex'>
                  <div className='w-6/12 p-2'>
                    <InputField
                      name='username'
                      value={formikProps.values.username}
                      placeholder='username'
                      label='Username'
                    />
                    <TextAreaField
                      name='description'
                      value={formikProps.values.description}
                      placeholder='description'
                      label='Description'
                    />
                  </div>
                  <div className='w-6/12 p-2'>
                    <div className='flex'>
                      <div className='w-1/3 mr-2'>
                        <DropdownField
                          {...formikProps}
                          fieldName='country'
                          list={COUNTRIES}
                        />
                      </div>
                      <div className='w-1/3 ml-2 mr-2'>
                        <DropdownField
                          {...formikProps}
                          fieldName='gender'
                          list={GENDERS}
                        />
                      </div>
                      <div className='w-1/3 ml-2'>
                        <DropdownField
                          {...formikProps}
                          fieldName='age'
                          list={AGES}
                        />
                      </div>
                    </div>
                    <DropdownField
                      {...formikProps}
                      fieldName='languages'
                      list={LANGUAGES}
                    />
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
                      value={formikProps.values.discord}
                      label='Discord username'
                      icon='discord'
                    />
                    <InputField
                      name='facebook'
                      value={formikProps.values.facebook}
                      label='Facebook username'
                      icon='facebook'
                    />
                    <InputField
                      name='instagram'
                      value={formikProps.values.instagram}
                      label='Instagram username'
                      icon='instagram'
                    />
                    <InputField
                      name='steam'
                      value={formikProps.values.steam}
                      label='Steam username'
                      icon='steam'
                    />
                  </div>
                  <div className='w-6/12 p-2'>
                    <InputField
                      name='twitter'
                      value={formikProps.values.twitter}
                      label='Twitter Username'
                      icon='twitter'
                    />
                    <InputField
                      name='snapchat'
                      value={formikProps.values.snapchat}
                      label='Snapchat Username'
                      icon='snapchat'
                    />
                    <InputField
                      name='twitch'
                      value={formikProps.values.twitch}
                      label='Twitch Username'
                      icon='twitch'
                    />
                    <InputField
                      name='tiktok'
                      value={formikProps.values.tiktok}
                      label='TikTok Username'
                      icon='tiktok'
                    />
                  </div>
                </div>
              </div>

              <div className='bg-white dark:bg-gray-800 dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                <h1 className='text-gray-900 dark:text-white mb-3'>Schedule</h1>
                <div className='flex flex-wrap'>
                  {formikProps.values.schedules.map(
                    ({ available, id, name, from, to }) => (
                      <Fragment key={name}>
                        <div className='w-2/12 flex items-center justify-start'>
                          {name}
                        </div>
                        <div className='w-3/12 p-2'>
                          <DropdownField
                            {...formikProps}
                            fieldKey='from'
                            fieldName='schedules'
                            dayName={name}
                            list={HOURS}
                          />
                        </div>
                        <div className='w-1/12 flex items-center justify-center'>
                          to
                        </div>
                        <div className='w-3/12'>
                          <DropdownField
                            {...formikProps}
                            fieldKey='to'
                            fieldName='schedules'
                            dayName={name}
                            list={HOURS}
                          />
                        </div>
                        <div className='w-3/12 flex items-center justify-center'>
                          <SwitchField
                            checked={available}
                            onChange={() => {
                              formikProps.setFieldValue(
                                'schedules',
                                formikProps.values.schedules.map((day) => {
                                  if (day.name === name) {
                                    day.available = !day.available;
                                  }
                                  return day
                                })
                              );
                            }}
                          />
                          Available
                        </div>
                      </Fragment>
                    )
                  )}
                </div>
              </div>
              <ButtonField
                loading={formikProps.isSubmitting}
                text='Save'
                type='submit'
              />
            </Form>
          </>
        )}
      </Formik>
    );
  } else {
    return <Loading />;
  }
};
