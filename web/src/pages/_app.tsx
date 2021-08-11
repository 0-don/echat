import './_app.css';
import { useEffect } from 'react';
import { AppProps } from 'next/app';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDiscord,
  faTwitter,
  faFacebook,
  faSnapchat,
  faInstagram,
  faTwitch,
  faSteam,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

library.add(
  faDiscord,
  faTwitter,
  faFacebook,
  faSnapchat,
  faInstagram,
  faTwitch,
  faSteam,
  faTiktok,
  faDollarSign
);

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.querySelector('body')?.classList?.add?.('dark:bg-dark-dark');
    document.querySelector('body')?.classList?.add?.('bg-gray-50');
  }, []);

  return <Component {...pageProps} />;
};

export default App;
