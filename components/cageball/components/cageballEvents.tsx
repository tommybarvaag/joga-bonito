import { CageballEvent } from "@/components/cageball";
import { CageballDate } from "@/types";
import * as React from "react";

const CageballEvents = ({ cageballDates }: { cageballDates: CageballDate[] }) => {
  return (
    <>
      {cageballDates.map((cageballDate, index) => (
        <CageballEvent key={`cageball-slot-${index}`} cageballDate={cageballDate} />
      ))}
    </>
  );
};

export default CageballEvents;
