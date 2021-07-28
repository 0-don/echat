import { Wrapper } from '../components/Wrapper';
import withApollo  from '../utils/apollo/withApollo';

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {

  return (
    <Wrapper navbar>
      <div>Hello</div>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Index);
