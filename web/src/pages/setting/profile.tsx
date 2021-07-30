import React from 'react';
import { ImageSection } from 'src/components/profile/ImageSection';
import { ProfileSection } from 'src/components/profile/ProfileSection';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';

const Profile: React.FC = () => {

  return (
    <Wrapper navbar>
      <ProfileSection />
      <ImageSection />
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Profile);
