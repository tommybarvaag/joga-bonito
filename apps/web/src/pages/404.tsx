import { Link } from "@/components/ui";
import { Box, Heading, Main } from "@joga-bonito/ui";

import * as React from "react";

const Custom404 = ({}: {}) => {
  return (
    <Main
      css={{
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "$4",
        position: "relative",
        maxWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "$1",
      }}
    >
      <Box
        css={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          top: 0,
          left: 0,
          backgroundImage: `url("/404.gif")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: "$pit",
        }}
      />
      <Heading
        css={{
          fontSize: "$12",
        }}
      >
        Oh my 404!
      </Heading>
      <Link href="/">Ta meg tilbake til sikkerhet!</Link>
    </Main>
  );
};

export default Custom404;
