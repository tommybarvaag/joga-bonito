import { Text } from "@/components/ui";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { formatSmallDateFullTime } from "@/utils/date";
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
      {formatSmallDateFullTime(new Date(cageballEvent.from))}
    </Text>
  );
};

export default CageballEvent;
