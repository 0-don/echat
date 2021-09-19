import withApollo from '../utils/apollo/withApollo';

interface OrderProps {}

const Order: React.FC<OrderProps> = ({}) => {
  return (
    <>
    <div className='h-screen flex' style={{ backgroundColor: '#0e0e10' }}>
      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex'>
          <h1 className='text-white'>asds</h1>
          <img
            src='https://global-oss.epal.gg/image/ablum/1599180566132.jpg'
            className='w-96'
          />
          <img
            src='https://global-oss.epal.gg/image/ablum/1599180566132.jpg'
            className='w-96'
          />
          <img
            src='https://global-oss.epal.gg/image/ablum/1599180566132.jpg'
            className='w-96'
          />
          <img
            src='https://global-oss.epal.gg/image/ablum/1599180566132.jpg'
            className='w-96'
          />
          <img
            src='https://global-oss.epal.gg/image/ablum/1599180566132.jpg'
            className='w-96'
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default withApollo({ ssr: false })(Order);
