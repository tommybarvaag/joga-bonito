import prismaUser from "@/lib/prismaUser";
import { sessionUserIsAdmin } from "@/utils/sessionUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function Users(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  if (!sessionUserIsAdmin(session)) {
    return res.status(403).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(await prismaUser.get());
  }

  return res.send("Method not allowed.");
}
