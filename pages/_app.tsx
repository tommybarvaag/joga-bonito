import { UserProvider } from "@/components/user";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider user={pageProps.session?.user}>
        <Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
