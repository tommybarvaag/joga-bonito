import { CageballEventVoters } from "@/components/cageball";
import { useUser } from "@/components/user";
import { useVote } from "@/components/vote";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { formatCageballEventTime } from "@/utils/date";
import { Button, Dialog, DialogContent, DialogTrigger } from "@joga-bonito/ui";
import { Vote } from "@prisma/client";
import * as React from "react";

const UserVoteDialog = ({ cageballEvent }: { cageballEvent: CageballEventWithVotesAndUser }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { user, update } = useUser();
  const { votes, add, remove } = useVote();

  const voted = React.useMemo(() => user?.votes?.some((userVote) => userVote.dateVoted === cageballEvent.formattedToFromDate) ?? false, [user, cageballEvent]);

  const votesForDate = React.useMemo(() => (votes ?? []).filter((vote) => vote.dateVoted === cageballEvent.formattedToFromDate), [votes, cageballEvent]);

  const addUserVote = () => {
    const clonedUserVotes: Vote[] = JSON.parse(JSON.stringify(user?.votes ?? []));

    update(
      {
        votes: [
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

    add(cageballEvent.formattedToFromDate, cageballEvent.id, user);
  };

  const removeUserVote = () => {
    const clonedUserVotes: Vote[] = JSON.parse(JSON.stringify(user?.votes ?? []));

    update(
      {
        votes: clonedUserVotes.filter((userVote) => userVote.dateVoted !== cageballEvent.formattedToFromDate),
      },
      false
    );

    remove(cageballEvent.formattedToFromDate, user);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(openChanged) => (openChanged ? null : setDialogOpen(openChanged))}>
      <DialogTrigger asChild>
        <Button
          size="1"
          variant={voted ? "grass" : "primary"}
          disabled={!cageballEvent.available || !cageballEvent.bookable}
          onClick={() => {
            if (voted) {
              setDialogOpen(true);
            } else {
              addUserVote();
            }
          }}
        >
          {formatCageballEventTime(new Date(cageballEvent.from))} ({votesForDate.length})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CageballEventVoters cageballEvent={cageballEvent} voted={voted} />
        <Button
          size="1"
          variant={voted ? "tomato" : "primary"}
          disabled={!cageballEvent.available || !cageballEvent.bookable}
          fullWidth
          onClick={() => {
            removeUserVote();
            setDialogOpen(false);
          }}
        >
          {voted ? "Fjern min påmelding" : "Meld meg på"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserVoteDialog;
