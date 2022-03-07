import { Logo } from "@/components/assets";
import { Button, Fieldset, Form, Input, Label, Main, Svg } from "@/components/ui";
import { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import * as React from "react";

const SignInPage = ({ csrfToken }: { csrfToken: string }) => {
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
      <Svg
        as={Logo}
        variant="text"
        css={{
          width: "195px",
          height: "48px",
          mb: "$5",
        }}
      />
      <Form method="post" action="/api/auth/signin/email">
        <Fieldset>
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Label>
            E-postadresse
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="din@epost.no"
              required
              css={{
                ml: "$3",
              }}
            />
          </Label>
        </Fieldset>
        <Button
          type="submit"
          css={{
            mt: "$5",
          }}
        >
          Send meg en magisk lenke
        </Button>
      </Form>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};

export default SignInPage;
