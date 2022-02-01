import { UserVotes, useUser } from "@/components/user";
import { CageballEventWithVotesAndUser, getCageballEvents } from "@/lib/cageball";
import type { GetServerSideProps } from "next";
import { getSession, signIn, signOut } from "next-auth/react";
import { prisma } from "../lib";

const Home = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  const { user } = useUser();

  return (
    <>
      <h1>{user ? `Hi ${user?.name}` : "Click button below to login"}</h1>
      {user ? <button onClick={() => signOut()}>Logout</button> : <button onClick={() => signIn()}>Login</button>}
      <UserVotes cageballEvents={cageballEvents} />
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
