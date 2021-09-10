import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import {
  // AGES,
  GENDERS,
  LANGUAGES,
  SCHEDULES,
} from 'src/constants';
import {
  MeDocument,
  UpdatedUser,
  useGetCountriesQuery,
  useGetLanguagesQuery,
  useMeQuery,
  useUpdateMeMutation,
} from 'src/generated/graphql';
import useFormStore from 'src/store/FormStore';
import {
  Button,
  InputField,
  SwitchField,
  TextAreaField,
  DropdownField,
  DatePickerField,
} from '../htmlElements';
import { TimePickerField } from '../htmlElements/TimePickerField';
import { FormikAutoSubmit } from '../utils/FormikAutoSubmit';
import { ImageSection } from './ImageSection';
import { Loading } from '../utils';

export type ProfileSectionProps = {
  formikRef?: React.RefObject<FormikProps<UpdatedUser>>;
};

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  formikRef,
}) => {
  const { data: getCountries } = useGetCountriesQuery();
  const { data: getLanguages } = useGetLanguagesQuery();

  const { setStep } = useFormStore();
  const [updateMe] = useUpdateMeMutation();
  const { data: user, loading } = useMeQuery();

  const countries = getCountries?.getCountries?.map((country) => country);
  const languages = getLanguages?.getLanguages?.map((language) => language);
  const userLanguage = user?.me?.languages?.map(({ id, name }) => ({
    id,
    name,
  }));

  const userSchedules = user?.me?.schedules?.map(
    ({ __typename, ...sched }) => ({
      ...sched,
      to: new Date(sched.to),
      from: new Date(sched.from),
    })
  );

  if (!loading && user && countries && languages) {
    return (
      <>
        <Formik
          initialValues={{
            username: user.me?.username || '',
            description: user.me?.description || '',
            age: new Date(
              user.me?.age ||
                new Date().setFullYear(new Date().getFullYear() - 18)
            ),
            gender: user.me?.gender || GENDERS[0].name,
            countryId: user.me?.countryId || countries[225].id,
            // country: user.me?.country || COUNTRIES[226].name,
            discord: user.me?.discord || '',
            twitter: user.me?.twitter || '',
            facebook: user.me?.facebook || '',
            snapchat: user.me?.snapchat || '',
            instagram: user.me?.instagram || '',
            twitch: user.me?.twitch || '',
            steam: user.me?.steam || '',
            tiktok: user.me?.tiktok || '',

            languages: userLanguage?.length ? userLanguage : [languages[23]],
            schedules: userSchedules?.length ? userSchedules : SCHEDULES,
          }}
          onSubmit={async (values) => {
         
            await updateMe({
              variables: { options: values },
              refetchQueries: [{ query: MeDocument }],
            });
          }}
          innerRef={formikRef}
        >
          {(formikProps) => (
            <>
              <Form className='mt-5'>
                <div className='bg-white dark:bg-dark dark:text-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                  <h1 className='text-gray-900 dark:text-white mb-3'>
                    Profile
                  </h1>
                  <div className='md:flex'>
                    <div className='md:w-6/12 md:mr-1'>
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
                    <div className='md:w-6/12 md:ml-1'>
                      <div className='md:flex '>
                        <DropdownField
                          {...formikProps}
                          fieldName='countryId'
                          list={countries}
                          className='md:w-6/12 md:mr-1'
                        />
                        <div className='flex md:w-6/12'>
                          <DropdownField
                            {...formikProps}
                            fieldName='gender'
                            list={GENDERS}
                            className='w-6/12 mr-0.5'
                          />

                          <DatePickerField
                            name='age'
                            className='w-6/12 ml-0.5'
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

                <div className='flex md:flex-nowrap flex-wrap-reverse mt-5'>
                  <div className='md:w-6/12 w-full md:mr-2.5 bg-white dark:bg-dark dark:text-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                    <h1 className='text-gray-900 dark:text-white mb-3'>
                      Schedule
                    </h1>

                    {formikProps.values.schedules.map(
                      ({ available, name, to, from }) => (
                        <div key={name} className='flex items-center '>
                          <div className='w-3/12'>{name}</div>

                          <div className={`w-3/12`}>
                            <TimePickerField
                              readOnly={!available}
                              label='from'
                              maxTime={to}
                              dayName={name}
                            />
                          </div>

                          <div className='w-1/12 text-center'>to</div>

                          <div className='w-3/12'>
                            <TimePickerField
                              readOnly={!available}
                              label='to'
                              minTime={from}
                              dayName={name}
                            />
                          </div>

                          <div className='w-2/12 flex items-center justify-center'>
                            {typeof available == 'boolean' && (
                              <SwitchField
                                checked={available}
                                onChange={() => {
                                  formikProps.setFieldValue(
                                    'schedules',
                                    formikProps.values.schedules.map((day) =>
                                      day.name === name
                                        ? { ...day, available: !day.available }
                                        : day
                                    )
                                  );
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className='md:w-6/12 w-full md:ml-2.5 dark:bg-dark bg-white dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                    <h1 className='text-gray-900 dark:text-white mb-3'>
                      Social Media
                    </h1>
                    <div className='flex'>
                      <div className='w-6/12 p-2'>
                        <InputField
                          name='discord'
                          value={formikProps.values.discord}
                          label='Discord'
                          brandIcon='discord'
                        />
                        <InputField
                          name='facebook'
                          value={formikProps.values.facebook}
                          label='Facebook'
                          brandIcon='facebook'
                        />
                        <InputField
                          name='instagram'
                          value={formikProps.values.instagram}
                          label='Instagram'
                          brandIcon='instagram'
                        />
                        <InputField
                          name='steam'
                          value={formikProps.values.steam}
                          label='Steam'
                          brandIcon='steam'
                        />
                      </div>
                      <div className='w-6/12 p-2'>
                        <InputField
                          name='twitter'
                          value={formikProps.values.twitter}
                          label='Twitter'
                          brandIcon='twitter'
                        />
                        <InputField
                          name='snapchat'
                          value={formikProps.values.snapchat}
                          label='Snapchat'
                          brandIcon='snapchat'
                        />
                        <InputField
                          name='twitch'
                          value={formikProps.values.twitch}
                          label='Twitch'
                          brandIcon='twitch'
                        />
                        <InputField
                          name='tiktok'
                          value={formikProps.values.tiktok}
                          label='TikTok'
                          brandIcon='tiktok'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-end justify-end'>
                  <Button
                    loading={formikProps.isSubmitting}
                    text='next'
                    icon='caret-right'
                    type='button'
                    onClick={() => {
                      setStep(1);
                    }}
                  />
                </div>

                <FormikAutoSubmit />
              </Form>
            </>
          )}
        </Formik>
      </>
    );
  } else {
    return <Loading />;
  }
};
