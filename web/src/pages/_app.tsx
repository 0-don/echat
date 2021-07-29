import './_app.css';
import { useEffect } from 'react';
import { AppProps } from "next/app";

const App = ({ Component, pageProps }:  AppProps) => {
  useEffect(() => {
    document.querySelector('body')?.classList?.add?.('dark:bg-gray-700');
    document.querySelector('body')?.classList?.add?.('bg-gray-50');
  }, []);

  return <Component {...pageProps} />;
};

export default App;
