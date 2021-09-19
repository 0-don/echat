import { Wrapper } from '../components/Wrapper';

import withApollo from '../utils/apollo/withApollo';

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  return (
    <Wrapper navbar>
      <div>asdas</div>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Order);
