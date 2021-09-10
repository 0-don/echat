import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';

const ServiceDetail: NextPage<{ serviceId: number }> = ({ serviceId }) => {

  return (
    <Wrapper navbar>
      <div className="text-white">asdasd</div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => {
  return {
    serviceId: parseInt(query.serviceId as string) ,
  };
};

export default withApollo({ ssr: false })(ServiceDetail);
