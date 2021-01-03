import { AppPropsType } from 'next/dist/next-server/lib/utils';
import React from 'react';
import GlobalStyle from '../styles/global-styles';

const App = ({ Component, pageProps }: AppPropsType) => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default App;
