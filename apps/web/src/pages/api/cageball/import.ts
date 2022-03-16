import { importCageballData } from "@/lib/cageball";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CageballImport(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(await importCageballData());
  }

  return res.send("Method not allowed.");
}
