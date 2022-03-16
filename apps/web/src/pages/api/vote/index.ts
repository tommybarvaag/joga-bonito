import { getVotes } from "@/lib/vote";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function Votes(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const votes = await getVotes();

  if (req.method === "GET") {
    return res.status(200).json(votes ?? []);
  }

  return res.send("Method not allowed.");
}
