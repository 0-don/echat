import { NextPage } from 'next';
import { useGetUserServiceByIdQuery } from 'src/generated/graphql';
import { Wrapper } from '../../components/Wrapper';
import withApollo from '../../utils/apollo/withApollo';

const ServiceDetail: NextPage<{ id: number }> = ({ id }) => {

  const { data, loading } = useGetUserServiceByIdQuery({variables:{id:id}});
  const service = data?.getUserServiceById.service;
  const userService = data?.getUserServiceById;
  const user = data?.getUserServiceById.user;
  console.log(service,user);

  console.log(data,loading);
  return (
    <Wrapper navbar>
    <h1 className='dark:text-white text-black text-4xl text-center mt-8'>{service?.name}</h1>
    <h1 className='dark:text-white text-black text-4xl text-center mt-8'>{userService?.price  } {userService?.per}</h1>
    <div className='flex space-x-72   border border-purple-dark'>
    <div> <h1 className='dark:text-white text-black text-4xl text-center mt-8'>Review Score</h1></div>
    <div> <h1 className='dark:text-white text-black text-4xl text-center mt-8'>Served</h1></div>
    <div> <h1 className='dark:text-white text-black text-4xl text-center mt-8'>Recommended</h1></div>

    </div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => {
  return {
    id: parseInt(query.id as string) ,
  };
};

export default withApollo({ ssr: false })(ServiceDetail);
