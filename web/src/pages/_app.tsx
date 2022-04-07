import 'react-datepicker/dist/react-datepicker.css';
import './_app.css';
import '../utils/icons';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import useDarkModeStore from 'src/store/DarkModeStore';

const App = ({ Component, pageProps }: AppProps) => {
  const { startTheme } = useDarkModeStore();

  useEffect(() => {
    startTheme();
  }, []);
  
  // @ts-ignore
  return <Component {...pageProps} />;
};

export default App;
