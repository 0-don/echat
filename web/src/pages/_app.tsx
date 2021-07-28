import { useEffect } from 'react';
import './_app.css';

const App = ({ Component, pageProps }: any) => {
  useEffect(() => {
    document.querySelector('body')?.classList?.add?.('dark:bg-gray-700');
    document.querySelector('body')?.classList?.add?.('bg-gray-50');
  }, []);

  return <Component {...pageProps} />;
};

export default App;
