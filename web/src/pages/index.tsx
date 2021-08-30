import { Loading } from 'src/components/utils';
import { Wrapper } from '../components/Wrapper';
import withApollo from '../utils/apollo/withApollo';

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {

  return (
    <Wrapper navbar>
      <div className='flex justify-center items-center mt-5'>
        <Loading />
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Index);
