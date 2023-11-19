import { Montserrat } from 'next/font/google';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import { NextPage } from 'next';

import '@/styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Provider } from 'jotai';

config.autoAddCss = false;

const roboto = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const App = ({ Component, pageProps }: AppProps) => {
  const [client] = useState(() => new QueryClient());
  const getLayout = (Component as NextPage & { getLayout: (page: JSX.Element) => JSX.Element }).getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={15 * 60}>
      <QueryClientProvider client={client}>
        <ToastContainer closeButton={false} pauseOnFocusLoss={false} />
        <Provider>
          <main className={`${roboto.variable} bg-gray-100 font-sans`}>{getLayout(<Component {...pageProps} />)}</main>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
