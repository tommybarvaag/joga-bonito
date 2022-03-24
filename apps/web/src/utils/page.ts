import { getCageballEvents } from "@/lib/cageball";
import { getUser } from "@/lib/user";
import { getISOWeek } from "date-fns";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const initCageballSsr: GetServerSideProps = async (context) => {
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

  const weekNumber = +(context.params?.weekNumber ?? getISOWeek(new Date()) + 1);

  console.log("week number", weekNumber);

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
      weekNumber,
      cageballEvents: (await getCageballEvents(weekNumber)).map(({ from, to, votes, ...other }) => ({
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
