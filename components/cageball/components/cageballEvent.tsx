import { Text } from "@/components/ui";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { formatCageballEventDateAndTime } from "@/utils/date";
import { CageballEvent } from "@prisma/client";
import * as React from "react";

const CageballEvent = ({ cageballEvent }: { cageballEvent: CageballEventWithVotesAndUser }) => {
  return (
    <Text
      textAlign="center"
      css={{
        minWidth: "180px",
      }}
    >
      {formatCageballEventDateAndTime(new Date(cageballEvent.from))}
    </Text>
  );
};

export default CageballEvent;
