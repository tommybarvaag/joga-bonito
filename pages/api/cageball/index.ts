import { getCageballEvents } from "@/lib/cageball";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Cageball(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(await getCageballEvents());
  }

  return res.send("Method not allowed.");
}
