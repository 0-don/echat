import React from 'react';
import { ImageSection } from 'src/components/profile/ImageSection';
import { ProfileSection } from 'src/components/profile/ProfileSection';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';
import { useApolloClient } from '@apollo/client';

const Profile: React.FC = (props) => {
  const apolloClient = useApolloClient();
  console.log(apolloClient.cache);
  return (
    <Wrapper navbar>
      <ProfileSection />
      <ImageSection />
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Profile);
