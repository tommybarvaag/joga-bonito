import { getVotesForWeekNumber } from "@/lib/vote";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function Vote(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const { weekNumber } = req.query;

  if (weekNumber === null || weekNumber === undefined) {
    return res.status(400).end();
  }

  const votes = await getVotesForWeekNumber(+weekNumber);

  if (req.method === "GET") {
    return res.status(200).json(votes ?? []);
  }

  return res.send("Method not allowed.");
}
