import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import { formatSmallDateFullTime } from "@/utils/date";
import { CageballEvent } from "@prisma/client";
import * as React from "react";

const CageballEvent = ({ cageballEvent }: { cageballEvent: CageballEventWithVotesAndUser }) => {
  return <div>{formatSmallDateFullTime(new Date(cageballEvent.from))}</div>;
};

export default CageballEvent;
