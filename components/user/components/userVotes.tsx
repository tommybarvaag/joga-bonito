import { Grid } from "@/components/ui";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import * as React from "react";
import { UserVote } from ".";

const UserVotes = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  return (
    <Grid
      gap="3"
      justifyContent="center"
      alignItems="center"
      gridTemplateColumns={{
        "@initial": "1",
        "@bp1": "2",
        "@bp2": "3",
      }}
      maxWidth="large"
      center
    >
      {cageballEvents.map((cageballEvent) => (
        <UserVote key={cageballEvent.formattedToFromDate} cageballEvent={cageballEvent} />
      ))}
    </Grid>
  );
};

export default UserVotes;
