import 'react-datepicker/dist/react-datepicker.css';
import './_app.css';
import '../utils/icons';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import useDarkModeStore from 'src/store/DarkModeStore';
import SimpleReactLightbox from 'simple-react-lightbox';

const App = ({ Component, pageProps }: AppProps) => {
  const { startTheme } = useDarkModeStore();
  useEffect(() => {
    document.querySelector('body')?.classList?.add?.('dark:bg-dark-dark');
    document.querySelector('body')?.classList?.add?.('bg-gray-50');
    startTheme();
  }, []);

  return (
    <SimpleReactLightbox>
      <Component {...pageProps} />
    </SimpleReactLightbox>
  );
};

export default App;
