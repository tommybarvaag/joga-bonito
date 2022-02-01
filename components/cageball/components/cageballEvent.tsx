import { CageballDate } from "@/types";
import { formatSmallDateFullTime } from "@/utils/date";
import * as React from "react";

const CageballEvent = ({ cageballDate }: { cageballDate: CageballDate }) => {
  return <div>{formatSmallDateFullTime(new Date(cageballDate.from))} (voters)</div>;
};

export default CageballEvent;
