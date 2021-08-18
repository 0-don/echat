import React, { useEffect } from 'react';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';
import { ProfileSection } from 'src/components/profile/ProfileSection';
import { GameSection } from 'src/components/profile/GameSection';
import { SubmitSection } from 'src/components/profile/SubmitSection';
import { FormSteps } from 'src/components/utils/FormSteps';
import useFormStore from 'src/store/FormStore';

const Profile: React.FC = () => {
  const { currentStep, formInit, hasHydrated } = useFormStore();

  // // const formikRef = useRef<FormikProps<UpdatedUser>>(null);
  // // const submitForm = () => {
  // //   if (formikRef.current) {
  // //     formikRef.current.submitForm();
  // //   }
  // // };
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
      {hasHydrated && currentStep === 'Profile' && <ProfileSection />}
      {hasHydrated && currentStep === 'Games' && <GameSection />}
      {hasHydrated && currentStep === 'Submit' && <SubmitSection />}
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Profile);
