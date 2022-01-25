import { CageballDate } from "@/types";
import * as React from "react";

const CageballEvent = ({ cageballDate }: { cageballDate: CageballDate }) => {
  return <div>{cageballDate.formattedToFromDate} (voters)</div>;
};

export default CageballEvent;
