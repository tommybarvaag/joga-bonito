import { getCageball } from "@/lib/cageball";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function CageballImport(req: NextApiRequest, res: NextApiResponse) {
  const cageball = await getCageball();

  if (req.method === "GET") {
    const collection = await prisma.$transaction(
      cageball.map((cur) =>
        prisma.cageballEvent.upsert({
          where: { formattedToFromDate: cur.formattedToFromDate },
          update: {
            available: cur.available,
            bookable: cur.bookable,
          },
          create: {
            formattedToFromDate: cur.formattedToFromDate,
            available: cur.available,
            bookable: cur.bookable,
            from: new Date(cur.from),
            to: new Date(cur.to),
          },
        })
      )
    );

    return res.status(200).json(collection);
  }

  return res.send("Method not allowed.");
}
