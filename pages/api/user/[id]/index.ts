import prisma from "@/lib/prisma";
import type { UserVote } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const { id } = req.query;

  if (id === null || id === undefined) {
    return res.status(400).end();
  }

  const user = await prisma.user.findFirst({
    where: {
      id: id as string,
    },
    include: {
      votes: true,
    },
  });

  if (!user) {
    return res.status(404).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(user);
  }

  if (req.method === "PUT" && req.body) {
    const { votes: updatedVotes, ...updatedUser }: { votes: UserVote[] } = req.body;
    const { votes: oldVotes, ...oldUser } = user;

    const votesToCreate = (updatedVotes ?? []).filter((a: UserVote) => !oldVotes.some((b) => a.dateVoted === b.dateVoted));

    await prisma.user.update({
      data: {
        ...oldUser,
        ...updatedUser,
        votes: {
          createMany: {
            data: votesToCreate.map((vote) => ({
              dateVoted: vote.dateVoted,
              updatedAt: new Date(),
              createdAt: new Date(),
            })),
          },
          deleteMany: {
            dateVoted: {
              notIn: updatedVotes.map((vote) => vote.dateVoted),
            },
            userId: user.id,
          },
        },
      },
      where: {
        id: id as string,
      },
    });

    return res.status(200).end();
  }

  if (req.method === "DELETE") {
    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
