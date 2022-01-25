import { CageballDate } from "@/types";
import * as React from "react";
import { UserVote } from ".";

const UserVotes = ({ cageballDates }: { cageballDates: CageballDate[] }) => {
  return (
    <>
      {cageballDates.map((cageballDate) => (
        <UserVote key={cageballDate.formattedToFromDate} cageballDate={cageballDate} />
      ))}
    </>
  );
};

export default UserVotes;
