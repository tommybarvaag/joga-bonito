import { Text } from "@/components/ui";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { formatCageballEventDateAndTime } from "@/utils/date";
import { CageballEvent } from "@prisma/client";
import * as React from "react";

const CageballEvent = ({ cageballEvent }: { cageballEvent: CageballEventWithVotesAndUser }) => {
  const cageballEventDate = React.useMemo(() => formatCageballEventDateAndTime(new Date(cageballEvent.from)), [cageballEvent.from]);

  return (
    <Text
      textAlign="center"
      css={{
        minWidth: "180px",
      }}
    >
      {cageballEventDate}
    </Text>
  );
};

export default CageballEvent;
