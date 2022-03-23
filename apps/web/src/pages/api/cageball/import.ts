import { importCageballData } from "@/lib/cageball";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CageballImport(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(await importCageballData());
  }

  if (req.method === "POST") {
    // get week number from body
    const weekNumber = req.body?.weekNumber;

    // If week number is not valid, return bad request
    if (isNaN(weekNumber)) {
      return res.status(400).json({ error: "Invalid week number" });
    }

    return res.status(200).json(await importCageballData(+weekNumber));
  }

  return res.send("Method not allowed.");
}
