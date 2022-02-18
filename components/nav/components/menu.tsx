import { Logo } from "@/components/assets";
import { MobileMenu } from "@/components/nav";
import { ThemeSelect } from "@/components/theme";
import { Button, Flex, Link, Nav, Svg } from "@/components/ui";
import { useUser } from "@/components/user";
import { signIn, signOut } from "next-auth/react";
import * as React from "react";
import { CSS } from "stitches.config";

const Menu = ({ ...other }: { css?: CSS }) => {
  const { user } = useUser();

  return (
    <Nav
      css={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid $cardBorder",
        marginBottom: "$3",
        "@bp1": {
          justifyContent: "space-between",
        },
      }}
      {...other}
    >
      <Link href="/">
        <Svg
          as={Logo}
          variant="text"
          css={{
            width: "195px",
            height: "48px",
          }}
        />
      </Link>
      <Flex
        gap="3"
        css={{
          display: "none",
          "@bp1": {
            display: "flex",
          },
        }}
      >
        <Button onClick={() => (user ? signOut() : () => signIn())}>{user ? "Logg ut" : "Logg inn"}</Button>
        <ThemeSelect />
      </Flex>
      <MobileMenu />
    </Nav>
  );
};

export default Menu;
