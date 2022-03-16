import { VoteWithUser } from "@/lib/vote";
import { getNextWeekNumber } from "@/utils/date";
import { fetcher } from "@/utils/fetcher";
import { User } from "@prisma/client";
import * as React from "react";
import useSWR from "swr";

type VoteContextProps = {
  votes: VoteWithUser[];
  add: (dateVoted: string, cageballEventId: string, user: User) => void;
  remove: (dateVoted: string, user: User) => void;
};

const VoteContext = React.createContext<VoteContextProps>(null);

function VoteProvider({ children, votes }: { children: React.ReactNode; votes?: VoteWithUser[] }) {
  const { data, mutate } = useSWR<VoteWithUser[]>(() => `/api/vote/weeknumber/${getNextWeekNumber()}`, fetcher, {
    fallbackData: votes,
    revalidateOnMount: true,
    // refresh once per minute
    // minutes x 60 seconds x 1000 milliseconds
    refreshInterval: 1 * 60 * 1000,
  });

  const value = React.useMemo(
    () => ({
      votes: data,
      add: (dateVoted: string, cageballEventId: string, user: User) =>
        mutate(
          (votes) => [
            ...votes,
            {
              id: "",
              dateVoted,
              userId: user.id,
              weekNumberVoted: getNextWeekNumber(),
              cageballEventId,
              createdAt: new Date(),
              updatedAt: new Date(),
              user,
            },
          ],
          false
        ),
      remove: (dateVoted: string, user: User) => {
        mutate((votes) => votes.filter((v) => v.dateVoted !== dateVoted || v.userId !== user.id), false);
      },
    }),
    [data, mutate]
  );

  return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
}
function useVote() {
  const context = React.useContext(VoteContext);

  if (context === undefined) {
    throw new Error("useVote must be used within a VoteProvider");
  }

  return context;
}

export { VoteProvider, useVote };
