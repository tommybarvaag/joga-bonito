import { CageballEvent, CageballEventVoters } from "@/components/cageball";
import { useUser } from "@/components/user";
import { useVote } from "@/components/vote";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { UserVote } from "@/types";
import { Vote } from "@prisma/client";
import * as React from "react";

const UserVote = ({ cageballEvent }: { cageballEvent: CageballEventWithVotesAndUser }) => {
  const { user, update } = useUser();
  const { add, remove } = useVote();

  const voted = React.useMemo(() => user?.votes?.some((userVote) => userVote.dateVoted === cageballEvent.formattedToFromDate) ?? false, [user, cageballEvent]);

  return (
    <div
      onClick={() => {
        const clonedUserVotes: Vote[] = JSON.parse(JSON.stringify(user?.votes ?? []));
        update(
          {
            votes: voted
              ? clonedUserVotes.filter((userVote) => userVote.dateVoted !== cageballEvent.formattedToFromDate)
              : [
                  ...clonedUserVotes,
                  {
                    userId: user.id,
                    dateVoted: cageballEvent.formattedToFromDate,
                    weekNumberVoted: cageballEvent.weekNumber,
                    cageballEventId: cageballEvent.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    id: "",
                  },
                ],
          },
          false
        );

        if (voted) {
          remove(cageballEvent.formattedToFromDate, user);
        } else {
          add(cageballEvent.formattedToFromDate, cageballEvent.id, user);
        }
      }}
    >
      <div>{voted ? "Voted" : "Not voted"}</div>
      <CageballEvent cageballEvent={cageballEvent} />
      <CageballEventVoters cageballEvent={cageballEvent} />
    </div>
  );
};

export default UserVote;
