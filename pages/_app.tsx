import { AppProps } from 'next/app';
import "../styles/globals.css";

export default function NoesisApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
