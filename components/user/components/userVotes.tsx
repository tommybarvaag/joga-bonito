import { Box, Grid, Heading, Text } from "@/components/ui";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { formatDay } from "@/utils/date";
import * as React from "react";
import { UserVote, UserVoteDialog } from ".";

const UserVotesAsList = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
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
      <Heading>Tilgjengelig for booking</Heading>
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
      <Heading>Utilgjengelig for booking</Heading>
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

const UserVotesAsCalendar = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  const cageballEventsByDays = React.useMemo(
    () =>
      (cageballEvents ?? []).reduce<{ [key: string]: CageballEventWithVotesAndUser[] }>((result, current) => {
        const day = formatDay(new Date(current.from));
        return current.available && current.bookable
          ? {
              ...result,
              [day]: [...(result[day] ?? []), current],
            }
          : {
              ...result,
            };
      }, {}),
    [cageballEvents]
  );

  const gridColumns = React.useMemo<"1" | "2" | "3" | "4" | "5">(() => {
    const keys = Object.keys(cageballEventsByDays ?? {}).length.toString();

    switch (keys) {
      case "1":
        return "1";
      case "2":
        return "2";
      case "3":
        return "3";
      case "4":
        return "4";
      case "5":
        return "5";
      default:
        return "4";
    }
  }, [cageballEventsByDays]);

  const rows = React.useMemo(
    () => Object.values(cageballEventsByDays ?? []).reduce((result, current) => (result > current.length ? result : current.length), 0),
    [cageballEventsByDays]
  );

  return (
    <>
      <Grid gridTemplateColumns={gridColumns} gap="2" css={{ mb: "$2" }}>
        {Object.keys(cageballEventsByDays ?? {}).map((day, index) => (
          <Text key={`${day}-${index}`} size="2" textAlign="center">
            {day}
          </Text>
        ))}
      </Grid>
      <Grid gridTemplateColumns={gridColumns} gap="2">
        {Array.from(Array(rows).keys()).map((index) =>
          Object.values(cageballEventsByDays ?? {}).map((cageballEventsByDay, cageballEventsByDayIndex) => {
            const cageballEvent = cageballEventsByDay[index];
            return cageballEvent ? (
              <UserVoteDialog key={`${cageballEvent.formattedToFromDate}-${index}-${cageballEventsByDayIndex}`} cageballEvent={cageballEvent} />
            ) : (
              <Box key={`no-day-${index}-${cageballEventsByDayIndex}`} />
            );
          })
        )}
      </Grid>
    </>
  );
};

const UserVotes = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  return <UserVotesAsCalendar cageballEvents={cageballEvents} />;
};

export default UserVotes;
