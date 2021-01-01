import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import React from 'react';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';

type Props = {
  styleTags: Array<React.ReactElement<{}>>;
};
export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page: RenderPageResult | Promise<RenderPageResult> = ctx.renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags: Array<React.ReactElement<{}>> = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta data-react-helmet="true" property="og:image" content="" />
          <link rel="stylesheet" type="text/css" href="./normalize.css" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
