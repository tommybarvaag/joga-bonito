import { Menu } from "@/components/nav";
import { Heading, Main } from "@/components/ui";
import { UserVotes } from "@/components/user";
import { CageballEventWithVotesAndUser, getCageballEvents } from "@/lib/cageball";
import { getUser } from "@/lib/user";
import { getISOWeek } from "date-fns";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import * as React from "react";

const Home = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  return (
    <>
      <Menu />
      <Main>
        <Heading size="3">{`Stem for uke ${getISOWeek(new Date()) + 1}`}</Heading>
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

  const { emailVerified, ...user } = await getUser(session?.user["id"]);

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
