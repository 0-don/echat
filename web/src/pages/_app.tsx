import 'react-datepicker/dist/react-datepicker.css';
import './_app.css';
import "../utils/icons"
import { useEffect } from 'react';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.querySelector('body')?.classList?.add?.('dark:bg-dark-dark');
    document.querySelector('body')?.classList?.add?.('bg-gray-50');
  }, []);

  return <Component {...pageProps} />;
};

export default App;
