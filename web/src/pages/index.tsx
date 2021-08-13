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
      <div className='mt-2 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white'>
        {data.getUsers.map((user) => (
             <div
             key={user.id}
             className='bg-white dark:bg-dark dark:text-white flex flex-col select-none mx-1 rounded-xl'
           >
             <h1 className='text-base my-1 font-semibold text-center text-black dark:text-white'>
               {user.username}
             </h1>
             <img src={user!.images![0].url || ""} className='h-auto' />
             <div className='flex sm:flex-1 flex-col gap-2 p-1 '>
               <div className='flex mt-auto items-center justify-between text-sm'>
                 <div className='flex items-center justify-center'>
                 
                   Status
                 </div>
                 <p className='text-black dark:text-white text-center'>
                 </p>
               </div>

               <div className='flex justify-between mt-auto'>
                 
               </div>
             </div>
           </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Index);
