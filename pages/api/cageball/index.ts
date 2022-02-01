import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Cageball(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(
      await prisma.cageballEvent.findMany({
        include: {
          votes: true,
        },
      })
    );
  }

  return res.send("Method not allowed.");
}
