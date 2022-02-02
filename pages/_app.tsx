import { UserProvider } from "@/components/user";
import { VoteProvider } from "@/components/vote";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { NextComponentType, NextPageContext } from "next";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { globalCss, lightTheme } from "stitches.config";

type MyAppProps = {
  Component: NextComponentType<NextPageContext, any, {}> & {
    layoutProps?: any;
  };
  pageProps?: {
    children: ReactNode;
    session?: Session;
    cageballEvents?: CageballEventWithVotesAndUser[];
  };
};

const globalStyles = globalCss({
  "*, ::before, ::after": {
    boxSizing: "border-box",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "currentColor",
  },
  html: {
    overflowX: "hidden",
  },
  body: {
    backgroundColor: "$gray12",
    color: "$gray1",
    fontFamily: "$default",
    minWidth: "360px",
    scrollBehavior: "smooth",
    margin: 0,
    padding: 0,
  },
  "#__next": {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});

function MyApp({ Component, pageProps }: MyAppProps) {
  globalStyles();
  return (
    <ThemeProvider
      attribute="class"
      value={{
        dark: "dark-theme",
        light: lightTheme.className,
      }}
    >
      <SessionProvider session={pageProps.session}>
        <UserProvider user={pageProps.session?.user}>
          <VoteProvider votes={pageProps?.cageballEvents?.reduce((result, current) => [...result, ...current.votes], [])}>
            <Component {...pageProps} />
          </VoteProvider>
        </UserProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
