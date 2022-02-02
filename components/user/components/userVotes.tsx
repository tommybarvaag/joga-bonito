import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import * as React from "react";
import { UserVote } from ".";

const UserVotes = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  return (
    <>
      {cageballEvents.map((cageballEvent) => (
        <UserVote key={cageballEvent.formattedToFromDate} cageballEvent={cageballEvent} />
      ))}
    </>
  );
};

export default UserVotes;
