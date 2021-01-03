import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { Head } from 'next/document';
import React from 'react';
import GlobalStyle from '../styles/global-styles';

const App = ({ Component, pageProps }: AppPropsType) => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default App;
