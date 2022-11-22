import "bootstrap/dist/css/bootstrap.css" 
import "../styles/globals.css";
import Script from 'next/script'
import type { AppProps } from "next/app";
import Head from "next/head";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PSA Sistema de Gestión</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
 
           <Component {...pageProps} />
    
   
    </>
  );
}

export default MyApp;
