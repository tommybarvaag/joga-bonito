import { UserProvider } from "@/components/user";
import { VoteProvider } from "@/components/vote";
import type { CageballEvent } from "@prisma/client";
import { NextComponentType, NextPageContext } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type MyAppProps = {
  Component: NextComponentType<NextPageContext, any, {}> & {
    layoutProps?: any;
  };
  pageProps?: {
    children: ReactNode;
    session?: Session;
    cageballEvents?: CageballEvent[];
  };
};

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider user={pageProps.session?.user}>
        <VoteProvider votes={pageProps?.cageballEvents?.reduce((result, current) => [...result, ...current.votes], [])}>
          <Component {...pageProps} />
        </VoteProvider>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
