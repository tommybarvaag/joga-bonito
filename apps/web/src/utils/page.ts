import { getCageballEvents } from "@/lib/cageball";
import { getUser } from "@/lib/user";
import { getISOWeek } from "date-fns";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const initCageballSsr: GetServerSideProps = async (context) => {
  performance.mark("start");
  const session = await getSession(context);
  performance.mark("getSession");

  if (!session?.user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const { emailVerified, ...user } = await getUser(session?.user["id"]);
  performance.mark("getUser");

  const weekNumber = +(context.params?.weekNumber ?? getISOWeek(new Date()) + 1);

  const cageballEvents = (await getCageballEvents(weekNumber)).map(({ from, to, votes, ...other }) => ({
    ...other,
    from: from.toISOString(),
    to: to.toISOString(),
    votes: (votes ?? []).map((vote) => ({
      ...vote,
      createdAt: vote.createdAt.toISOString(),
      updatedAt: vote.updatedAt.toISOString(),
    })),
  }));
  performance.mark("getCageballEvents");

  performance.measure("measure from start to getSession", "start", "getSession");
  performance.measure("measure from getSession to getUser", "getSession", "getUser");
  performance.measure("measure from getUser to getCageballEvents", "getUser", "getCageballEvents");

  console.log(performance.getEntriesByType("measure"));

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
      cageballEvents,
    },
  };
};
