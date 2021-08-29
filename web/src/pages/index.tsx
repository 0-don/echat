import { Loading } from 'src/components/utils';
import { useGetUsersQuery } from 'src/generated/graphql';
import { Wrapper } from '../components/Wrapper';
import withApollo from '../utils/apollo/withApollo';

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { data, loading } = useGetUsersQuery();

  if (loading || !data?.getUsers) {
    return <Loading />;
  }

  return (
    <Wrapper navbar>
      <div className='flex justify-center items-center mt-5'>
        <Loading />
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Index);
