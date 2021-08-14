import React, { Fragment, useEffect } from 'react';
// import { Wrapper } from '../../components/Wrapper';
// import withApollo from '../../utils/apollo/withApollo';
// import { ProfileSection } from 'src/components/profile/ProfileSection';
// import { GameSection } from 'src/components/profile/GameSection';
// import { SubmitSection } from 'src/components/profile/SubmitSection';
// import { FormSteps } from 'src/components/utils/FormSteps';
// import useFormStore from 'src/store/FormStore';

const Profile: React.FC = () => {
  const { steps, formInit } = useFormStore();

  // const formikRef = useRef<FormikProps<UpdatedUser>>(null);
  // const submitForm = () => {
  //   if (formikRef.current) {
  //     formikRef.current.submitForm();
  //   }
  // };
  useEffect(() => {
    formInit([
      { id: 0, name: 'Profile', status: 'current' },
      { id: 1, name: 'Games', status: 'upcoming' },
      { id: 2, name: 'Submit', status: 'upcoming' },
    ]);
  }, []);
  
  return (
    <Wrapper navbar>
      <FormSteps />
      {steps.map(({ status, name }) => (
        <Fragment key={name}>
          {status === 'current' && name === 'Profile' && <ProfileSection />}
          {status === 'current' && name === 'Games' && <GameSection />}
          {status === 'current' && name === 'Submit' && <SubmitSection />}
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Profile);
