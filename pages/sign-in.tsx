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

const isUUID = (sessionCookie: string) => {
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return isUUID.test(sessionCookie);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);

  // Clean invalid next-auth session cookies
  (Object.keys(context.req.cookies) ?? []).forEach((name) => {
    if (name?.indexOf("next-auth.session-token") > -1 && !isUUID(context.req.cookies[name])) {
      context.res.setHeader("Set-Cookie", `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`);
    }
  });

  return {
    props: { csrfToken },
  };
};

export default SignInPage;
