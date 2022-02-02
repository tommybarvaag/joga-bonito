import { useVote } from "@/components/vote";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import * as React from "react";

const CageballEventVoters = ({ cageballEvent }: { cageballEvent: CageballEventWithVotesAndUser }) => {
  const { votes } = useVote();

  const votesForDate = React.useMemo(() => (votes ?? []).filter((vote) => vote.dateVoted === cageballEvent.formattedToFromDate), [votes, cageballEvent]);

  return (
    <div>
      ({votesForDate.length} {votesForDate?.reduce((result, current) => [...result, current?.user?.name ?? "Unknown voter"], []).join(", ")})
    </div>
  );
};

export default CageballEventVoters;
