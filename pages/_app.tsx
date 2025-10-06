import { AppProps } from 'next/app';
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

export default function NoesisApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
