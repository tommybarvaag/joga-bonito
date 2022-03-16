import { Menu } from "@/components/nav";
import { Heading, Main } from "@/components/ui";
import { AuthenticatedLayout, UserVotes } from "@/components/user";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { initCageballSsr } from "@/utils/page";
import { Button } from "@joga-bonito/core";
import { getISOWeek } from "date-fns";
import type { GetServerSideProps } from "next";
import * as React from "react";

const HomePage = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  return (
    <>
      <Button>Core</Button>
      <Menu />
      <Main>
        <Heading size="3">{`Stem for uke ${getISOWeek(new Date()) + 1}`}</Heading>
        <UserVotes cageballEvents={cageballEvents} />
      </Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => await initCageballSsr(context);

HomePage.layoutProps = {
  meta: {
    title: "Joga Bonito",
  },
  Layout: AuthenticatedLayout,
};

export default HomePage;