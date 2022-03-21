import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { darkTheme, globalCss } from "@joga-bonito/ui";
import { NextComponentType, NextPageContext } from "next";
import { Session } from "next-auth";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import { ReactNode } from "react";

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
    backgroundColor: "$gray2",
    color: "$gray12",
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

  const Layout = Component.layoutProps?.Layout || React.Fragment;

  const layoutProps = Component.layoutProps?.Layout ? { pageProps, layoutProps: Component.layoutProps } : {};

  return (
    <ThemeProvider
      attribute="class"
      value={{
        light: "light-theme",
        dark: darkTheme.className,
      }}
      defaultTheme="dark"
      enableSystem={false}
      storageKey="joga-bonito-theme"
    >
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
