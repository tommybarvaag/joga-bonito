import { Grid, Heading } from "@/components/ui";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import * as React from "react";
import { UserVote } from ".";

const UserVotes = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  const availableCageballEvents = React.useMemo(
    () => cageballEvents.filter((cageballEvent) => cageballEvent.available && cageballEvent.bookable),
    [cageballEvents]
  );

  const unavailableCageballEvents = React.useMemo(
    () => cageballEvents.filter((cageballEvent) => !cageballEvent.available || !cageballEvent.bookable),
    [cageballEvents]
  );

  return (
    <>
      <Heading>Available cageball slots</Heading>
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
        css={{
          mb: "$6",
        }}
      >
        {availableCageballEvents.map((cageballEvent) => (
          <UserVote key={cageballEvent.formattedToFromDate} cageballEvent={cageballEvent} />
        ))}
      </Grid>
      <Heading>Unavailable cageball slots</Heading>
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
        css={{
          mb: "$6",
        }}
      >
        {unavailableCageballEvents.map((cageballEvent) => (
          <UserVote key={cageballEvent.formattedToFromDate} cageballEvent={cageballEvent} />
        ))}
      </Grid>
    </>
  );
};

export default UserVotes;
