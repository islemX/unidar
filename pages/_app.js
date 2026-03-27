/**
 * UNIDAR – Pages Layout Wrapper
 * All pages inherit styles and common JS
 */
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const initAll = () => {
    if (window.initCommon) {
      window.initCommon();
    } else if (window.UNIDAR_I18N) {
      window.UNIDAR_I18N.init?.();
      window.UNIDAR_I18N.injectSwitcher?.('.nav-container');
    }
    
    // Chat widget is provided by /js/chat-widget.js (loaded below)
    if (window.ChatWidget && !window.chatWidget) {
      window.chatWidget = new window.ChatWidget();
      window.chatWidget.init?.();
    }
  };

  useEffect(() => {
    initAll();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/design-tokens.css" />
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="stylesheet" href="/css/premium.css" />
        <link rel="stylesheet" href="/css/chat-widget.css" />
      </Head>

      {/* Load core scripts */}
      <Script 
        src="/js/i18n.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="/js/api.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="/js/utils.js" 
        strategy="afterInteractive" 
      />
      <Script 
        src="/js/common.js" 
        strategy="afterInteractive" 
        onLoad={initAll}
      />
      <Script
        src="/js/signature-pad.js?v=2"
        strategy="afterInteractive"
      />
      <Script
        src="/js/chat-widget.js"
        strategy="afterInteractive"
        onLoad={initAll}
      />

      <Component {...pageProps} />
    </>
  );
}


