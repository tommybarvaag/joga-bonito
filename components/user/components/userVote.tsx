import { CageballEvent, CageballEventVoters } from "@/components/cageball";
import { Button, Card, Svg } from "@/components/ui";
import { useUser } from "@/components/user";
import { useVote } from "@/components/vote";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { UserVote } from "@/types";
import { Vote } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import * as React from "react";

const UserVote = ({ cageballEvent }: { cageballEvent: CageballEventWithVotesAndUser }) => {
  const { user, update } = useUser();
  const { add, remove } = useVote();

  const voted = React.useMemo(() => user?.votes?.some((userVote) => userVote.dateVoted === cageballEvent.formattedToFromDate) ?? false, [user, cageballEvent]);

  return (
    <Card
      css={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "$3",
        backgroundColor: cageballEvent.available && cageballEvent.bookable ? "$gray3" : "transparent",
      }}
    >
      <Button
        variant={voted ? "grass" : "primary"}
        disabled={!cageballEvent.available || !cageballEvent.bookable}
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
        <Svg
          as={ArrowUpIcon}
          size="3"
          css={{
            color: voted ? "$grass11" : "$gray9",
            transition: "all 0.2s ease-in-out",
          }}
        />
        <CageballEvent cageballEvent={cageballEvent} />
      </Button>
      <CageballEventVoters asPopover cageballEvent={cageballEvent} voted={voted} />
    </Card>
  );
};

export default UserVote;
