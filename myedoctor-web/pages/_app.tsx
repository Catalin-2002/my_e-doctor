import { Roboto } from 'next/font/google';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import { NextPage } from 'next';


config.autoAddCss = false;

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = (Component as NextPage & { getLayout: (page: JSX.Element) => JSX.Element }).getLayout || ((page) => page);

  return <main className={`${roboto.variable} font-sans bg-white`}>{getLayout(<Component {...pageProps} />)}</main>;
}

export default App;