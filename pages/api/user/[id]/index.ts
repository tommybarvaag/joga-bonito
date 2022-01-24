import prisma from "@/lib/prisma";
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
  });

  if (!user) {
    return res.status(404).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(user);
  }

  if (req.method === "PUT" && req.body) {
    await prisma.user.update({
      data: {
        ...user,
        ...req.body,
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
