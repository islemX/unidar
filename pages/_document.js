/**
 * UNIDAR � Custom Document
 */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Global Stylesheets - Moved here for performance & compliance */}
        <link rel="stylesheet" href="/css/design-tokens.css" />
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="stylesheet" href="/css/premium.css" />
        <link rel="stylesheet" href="/css/contracts.css" />
        <link rel="stylesheet" href="/css/chat-widget.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

