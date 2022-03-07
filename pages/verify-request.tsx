import { Heading, Main, Paragraph } from "@/components/ui";
import * as React from "react";

const VerifyRequestPage = () => {
  return (
    <Main
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Heading size="4">Magisk lenke</Heading>
      <Paragraph textAlign="center">En magisk lenke har blitt sent til din e-postadresse. Klikk på lenken for å logge inn.</Paragraph>
    </Main>
  );
};

export default VerifyRequestPage;
