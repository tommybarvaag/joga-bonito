import { getVote } from "@/lib/vote";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function Vote(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const { id } = req.query;

  if (id === null || id === undefined) {
    return res.status(400).end();
  }

  const vote = await getVote(id as string);

  if (!vote) {
    return res.status(404).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(vote);
  }

  return res.send("Method not allowed.");
}
