import { Box, Button, Text } from "@/components/ui";
import Popover, { PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useVote } from "@/components/vote";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import * as React from "react";

const CageballEventVoters = ({ cageballEvent, voted = false }: { cageballEvent: CageballEventWithVotesAndUser; voted?: boolean }) => {
  const { votes } = useVote();

  const votesForDate = React.useMemo(() => (votes ?? []).filter((vote) => vote.dateVoted === cageballEvent.formattedToFromDate), [votes, cageballEvent]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={voted ? "grass" : "primary"} disabled={!cageballEvent.available || !cageballEvent.bookable} borderRound>
          {votesForDate.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Box>
          {votesForDate.length > 0 ? (
            votesForDate
              ?.reduce((result, current) => [...result, current?.user?.name ?? "Unknown voter"], [])
              .map((userName) => <Text key={`${cageballEvent.id}-${userName}`}>{userName}</Text>)
          ) : (
            <Text>No votes</Text>
          )}
        </Box>
        <PopoverArrow offset={11} />
      </PopoverContent>
    </Popover>
  );
};

export default CageballEventVoters;
