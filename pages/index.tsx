import { Button, Flex, Heading, IconButton, Main, Nav, Svg } from "@/components/ui";
import { UserVotes, useUser } from "@/components/user";
import { CageballEventWithVotesAndUser, getCageballEvents } from "@/lib/cageball";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { getISOWeek } from "date-fns";
import type { GetServerSideProps } from "next";
import { getSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import * as React from "react";
import { prisma } from "../lib";

const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "light" ? <Svg as={MoonIcon} size="3" variant="gray"></Svg> : <Svg as={SunIcon} size="3" variant="gray"></Svg>}
    </IconButton>
  );
};

const Home = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  const { user } = useUser();

  return (
    <>
      <Nav
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Heading size="4" noMargin>
          {user ? `Hei ${user?.name}` : "Klikk på knappen under for å logge inn"}
        </Heading>
        <Flex gap="3">
          <Button onClick={() => (user ? signOut() : () => signIn())}>{user ? "Logg ut" : "Logg inn"}</Button>
          <ThemeSelect />
        </Flex>
      </Nav>
      <Main>
        <Heading size="3">{`Uke ${getISOWeek(new Date()) + 1}`}</Heading>
        <UserVotes cageballEvents={cageballEvents} />
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const { emailVerified, ...user } = await prisma.user.findUnique({
    where: {
      id: session.user["id"],
    },
    include: {
      votes: true,
    },
  });

  return {
    props: {
      session: {
        ...session,
        user: {
          ...session.user,
          ...user,
          votes: user?.votes?.map(({ dateVoted, userId, id }) => ({ id, userId, dateVoted })),
        },
      },
      cageballEvents: (await getCageballEvents()).map(({ from, to, votes, ...other }) => ({
        ...other,
        from: from.toISOString(),
        to: to.toISOString(),
        votes: (votes ?? []).map((vote) => ({
          ...vote,
          createdAt: vote.createdAt.toISOString(),
          updatedAt: vote.updatedAt.toISOString(),
        })),
      })),
    },
  };
};

export default Home;
