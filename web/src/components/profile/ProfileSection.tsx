import { Form, Formik, FormikProps } from 'formik';
import React, { Dispatch, Fragment, SetStateAction } from 'react';
import {
  // AGES,
  GENDERS,
  HOURS,
  COUNTRIES,
  LANGUAGES,
  SCHEDULES,
} from 'src/constants';
import {
  MeDocument,
  UpdatedUser,
  useMeQuery,
  useUpdateMeMutation,
} from 'src/generated/graphql';
import {
  Button,
  InputField,
  SwitchField,
  TextAreaField,
  DropdownField,
  DatePickerField,
} from '../htmlElements';

import { Loading } from '../utils';
import { FormikAutoSubmit } from '../utils/FormikAutoSubmit';
import { StepType } from '../utils/FormSteps';
import { ImageSection } from './ImageSection';

export type ProfileSectionProps = {
  formikRef: React.RefObject<FormikProps<UpdatedUser>>;
  currentStep?: string;
  steps?: StepType[];
  setSteps?: Dispatch<SetStateAction<StepType[]>>;
};

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  formikRef,
  currentStep,
  steps,
  setSteps,
}) => {
  const [updateMe] = useUpdateMeMutation();
  const { data: user, loading } = useMeQuery();

  const userLanguage = user?.me?.languages?.map(({ id, name }) => ({
    id,
    name,
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
      <>
        <Formik
          initialValues={{
            username: user.me?.username || '',
            description: user.me?.description || '',
            age:  user.me?.age || new Date(),
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
          onSubmit={async (values) => {
            console.log(values);
            await updateMe({
              variables: { options: values },
              refetchQueries: [{ query: MeDocument }],
            });
          }}
          innerRef={formikRef}
        >
          {(formikProps) => (
            <>
              <Form className='space-y-6 mt-5'>
                <div className='bg-white dark:bg-dark dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                  <h1 className='text-gray-900 dark:text-white mb-3'>
                    Profile
                  </h1>
                  <div className='md:flex'>
                    <div className='md:w-6/12 p-2'>
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
                    <div className='md:w-6/12 p-2'>
                      <div className='flex'>
                        <div className='w-3/4 mr-1'>
                          <DropdownField
                            {...formikProps}
                            fieldName='country'
                            list={COUNTRIES}
                          />
                        </div>
                        <div className='w-3/4 mr-1'>
                          <DropdownField
                            {...formikProps}
                            fieldName='gender'
                            list={GENDERS}
                          />
                        </div>
                        <div className='w-3/4 mr-1'>
                          <DatePickerField name='age' />
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

                <div className='bg-white dark:bg-dark dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                  <h1 className='text-gray-900 dark:text-white mb-3'>
                    Social Media
                  </h1>
                  <div className='flex'>
                    <div className='w-6/12 p-2'>
                      <InputField
                        name='discord'
                        value={formikProps.values.discord}
                        label='Discord username'
                        brandIcon='discord'
                      />
                      <InputField
                        name='facebook'
                        value={formikProps.values.facebook}
                        label='Facebook username'
                        brandIcon='facebook'
                      />
                      <InputField
                        name='instagram'
                        value={formikProps.values.instagram}
                        label='Instagram username'
                        brandIcon='instagram'
                      />
                      <InputField
                        name='steam'
                        value={formikProps.values.steam}
                        label='Steam username'
                        brandIcon='steam'
                      />
                    </div>
                    <div className='w-6/12 p-2'>
                      <InputField
                        name='twitter'
                        value={formikProps.values.twitter}
                        label='Twitter Username'
                        brandIcon='twitter'
                      />
                      <InputField
                        name='snapchat'
                        value={formikProps.values.snapchat}
                        label='Snapchat Username'
                        brandIcon='snapchat'
                      />
                      <InputField
                        name='twitch'
                        value={formikProps.values.twitch}
                        label='Twitch Username'
                        brandIcon='twitch'
                      />
                      <InputField
                        name='tiktok'
                        value={formikProps.values.tiktok}
                        label='TikTok Username'
                        brandIcon='tiktok'
                      />
                    </div>
                  </div>
                </div>

                <div className='bg-white dark:bg-dark dark:text-white  shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5'>
                  <h1 className='text-gray-900 dark:text-white mb-3'>
                    Schedule
                  </h1>
                  <div className='flex flex-wrap items-center'>
                    {formikProps.values.schedules.map(({ available, name }) => (
                      <Fragment key={name}>
                        <div className='w-2/12'>{name}</div>
                        <div className='w-3/12'>
                          <DropdownField
                            {...formikProps}
                            fieldKey='from'
                            fieldName='schedules'
                            dayName={name}
                            list={HOURS}
                          />
                        </div>
                        <div className='w-1/12 text-center'>to</div>
                        <div className='w-3/12'>
                          <DropdownField
                            {...formikProps}
                            fieldKey='to'
                            fieldName='schedules'
                            dayName={name}
                            list={HOURS}
                          />
                        </div>
                        <div className='w-3/12  flex items-center justify-center'>
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
                          Available
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <Button
                  loading={formikProps.isSubmitting}
                  text='Next'
                  type='button'
                  onClick={() => {
                    if (steps && setSteps) {
                      const findIndex = steps.findIndex(
                        (step) => step.name === currentStep
                      );
                      setSteps(
                        steps.map((step) => {
                          if (step.id < findIndex + 1) {
                            step.status = 'complete';
                          }
                          if (step.id === findIndex + 1) {
                            step.status = 'current';
                          }
                          if (step.id > findIndex + 1) {
                            step.status = 'upcoming';
                          }
                          return step;
                        })
                      );
                    }
                  }}
                />
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
