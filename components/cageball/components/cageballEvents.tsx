import { CageballEvent } from "@/components/cageball";
import { CageballEventWithVotesAndUser } from "@/lib/cageball";
import * as React from "react";

const CageballEvents = ({ cageballEvents }: { cageballEvents: CageballEventWithVotesAndUser[] }) => {
  return (
    <>
      {cageballEvents.map((cageballEvent, index) => (
        <CageballEvent key={`cageball-slot-${index}`} cageballEvent={cageballEvent} />
      ))}
    </>
  );
};

export default CageballEvents;
