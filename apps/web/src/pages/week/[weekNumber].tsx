import { Menu } from "@/components/nav";
import { Heading, Main } from "@joga-bonito/ui";
import { AuthenticatedLayout, UserVotes } from "@/components/user";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { initCageballSsr } from "@/utils/page";
import type { GetServerSideProps } from "next";
import * as React from "react";

const WeekNumberPage = ({ weekNumber, cageballEvents }: { weekNumber: number; cageballEvents: CageballEventWithVotesAndUser[] }) => {
  return (
    <>
      <Menu />
      <Main>
        <Heading size="3">{`Stem for uke ${weekNumber}`}</Heading>
        <UserVotes cageballEvents={cageballEvents} />
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => await initCageballSsr(context);

WeekNumberPage.layoutProps = {
  meta: {
    title: "Week",
  },
  Layout: AuthenticatedLayout,
};

export default WeekNumberPage;
