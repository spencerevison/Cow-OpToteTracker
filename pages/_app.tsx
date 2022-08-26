import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Cow-Op Tote Tracker</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Utility application for tracking tote inventory"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#faf7f5" />

        <link rel="apple-touch-icon" href="/ios/152.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/touch-icon-ipad.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />

        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        <meta name="application-name" content="Cow-Op Tote Tracker" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cow-Op Tote Tracker" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#faf7f5" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#faf7f5" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
