import { AppPropsType } from 'next/dist/next-server/lib/utils';
import React from 'react';

const App = ({ Component, pageProps }: AppPropsType) => (
  <>
    <Component {...pageProps} />
  </>
);

export default App;
