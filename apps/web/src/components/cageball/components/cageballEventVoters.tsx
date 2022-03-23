import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui";
import { useVote } from "@/components/vote";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { Box, Button, Heading, Text } from "@joga-bonito/ui";
import * as React from "react";

const CageballEventVoters = ({
  cageballEvent,
  voted = false,
  asPopover = false,
}: {
  cageballEvent: CageballEventWithVotesAndUser;
  voted?: boolean;
  asPopover?: boolean;
}) => {
  const { votes } = useVote();

  const votesForDate = React.useMemo(() => (votes ?? []).filter((vote) => vote.dateVoted === cageballEvent.formattedToFromDate), [votes, cageballEvent]);

  const voterList = React.useMemo(
    () => (
      <Box>
        {votesForDate.length > 0 ? (
          votesForDate
            ?.reduce((result, current) => [...result, current?.user?.name ?? "Unknown voter"], [])
            .map((userName) => <Text key={`${cageballEvent.id}-${userName}`}>{userName}</Text>)
        ) : (
          <Text>No votes</Text>
        )}
      </Box>
    ),
    [votesForDate, cageballEvent]
  );

  if (asPopover) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={voted ? "grass" : "primary"} disabled={!cageballEvent.available || !cageballEvent.bookable} borderRound>
            {votesForDate.length}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Box>{voterList}</Box>
          <PopoverArrow offset={11} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Box
      css={{
        mb: "$3",
      }}
    >
      <Heading size="1">Påmeldt</Heading>
      {voterList}
    </Box>
  );
};

export default CageballEventVoters;
