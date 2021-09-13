import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';

const UserDetail: NextPage<{ id: number }> = ({ id }) => {
  console.log(id);
  return (
    <Wrapper navbar className='dark:text-white text-black'>
      <div>asdasd</div>
      <div>asasdasddasd</div>
      <div>asasdasddasd</div>
      <div>asasdasddasd</div>
    </Wrapper>
  );
};

UserDetail.getInitialProps = ({ query }) => {
  return {
    id: parseInt(query.id as string),
  };
};

export default withApollo({ ssr: false })(UserDetail);
