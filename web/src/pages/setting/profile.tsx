import React, { Fragment, useRef, useState } from 'react';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';
import { FormikProps } from 'formik';
import { UpdatedUser } from 'src/generated/graphql';

import { ProfileSection } from 'src/components/profile/ProfileSection';
import { GameSection } from 'src/components/profile/GameSection';
import { SubmitSection } from 'src/components/profile/SubmitSection';
import { FormSteps, StepType } from 'src/components/utils/FormSteps';

const Profile: React.FC = () => {
  const formikRef = useRef<FormikProps<UpdatedUser>>(null);

  const [steps, setSteps] = useState<StepType[]>([
    { id: 0, name: 'Profile', status: 'current' },
    { id: 1, name: 'Games', status: 'upcoming' },
    { id: 2, name: 'Submit', status: 'upcoming' },
  ]);

  // const submitForm = () => {
  //   if (formikRef.current) {
  //     formikRef.current.submitForm();
  //   }
  // };

  return (
    <Wrapper navbar>
      <FormSteps steps={steps} setSteps={setSteps} />
      {steps.map(({ status, name }, index) => (
        <Fragment key={index}>
          {status === 'current' && name === 'Profile' && (
            <ProfileSection
              formikRef={formikRef}
              steps={steps}
              setSteps={setSteps}
              currentStep={name}
            />
          )}
          {status === 'current' && name === 'Games' && (
            <GameSection
              steps={steps}
              setSteps={setSteps}
              currentStep={name}
            />
          )}
          {status === 'current' && name === 'Submit' && (
            <SubmitSection
              steps={steps}
              setSteps={setSteps}
              currentStep={name}
            />
          )}
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Profile);
