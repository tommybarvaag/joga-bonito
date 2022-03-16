import { getCageballEvents } from "@/lib/cageball";
import { formatCageballEventDateAndTime, formatDay } from "@/utils/date";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Cageball(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res
      .status(200)
      .json(
        ((await getCageballEvents()) ?? [])
          .filter((event) => event.available && event.bookable)
          .map(({ from }) => `${formatDay(from)} ${formatCageballEventDateAndTime(from)}`)
      );
  }

  return res.send("Method not allowed.");
}
