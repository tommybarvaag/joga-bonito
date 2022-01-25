import { CageballEvent } from "@/components/cageball";
import { CageballDate, UserVote } from "@/types";
import * as React from "react";
import { useUser } from "..";

const UserVote = ({ cageballDate }: { cageballDate: CageballDate }) => {
  const { user, update } = useUser();

  const voted = React.useMemo(() => user?.votes?.some((userVote) => userVote.dateVoted === cageballDate.formattedToFromDate) ?? false, [user, cageballDate]);

  return (
    <div
      onClick={() => {
        const clonedUserVotes: UserVote[] = JSON.parse(JSON.stringify(user?.votes ?? []));
        update(
          {
            votes: voted
              ? clonedUserVotes.filter((userVote) => userVote.dateVoted !== cageballDate.formattedToFromDate)
              : [...clonedUserVotes, { userId: user.id, dateVoted: cageballDate.formattedToFromDate, created: "", updated: "" }],
          },
          false
        );
      }}
    >
      <div>{voted ? "Voted" : "Not voted"}</div>
      <CageballEvent cageballDate={cageballDate} />
    </div>
  );
};

export default UserVote;
