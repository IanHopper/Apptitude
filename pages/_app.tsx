import Layout from "../components/Layout";
import "../styles/globals.css";
import { AppWrapper } from "../context/state";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type {AppProps} from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <AppWrapper>
      <Layout>      
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  );
}

export default MyApp;
