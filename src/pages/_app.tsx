import Head from "next/head";
import { AppProps } from "next/app";
import { Header } from "../components/Header";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>IgNews</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
