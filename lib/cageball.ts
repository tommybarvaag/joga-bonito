import { CageballData, CageballDate, JSONResponse } from "@/types";
import { dateNextWeek, formatFull, formatYmd } from "@/utils/date";
import { CageballEvent } from "@prisma/client";
import { getISOWeek } from "date-fns";
import prisma from "./prisma";

const getCageballData = async (): Promise<CageballData[]> => {
  const response = await fetch(
    `https://api.ibooking.no/v1/resource_instances?slots=1&studio_id=1026&resource_category_id=783&from=${formatYmd(dateNextWeek(1))}&to=${formatYmd(
      dateNextWeek(5)
    )}`,
    {
      method: "GET",
      headers: {
        "x-ibooking-origin-hostname": "huseklepparena.ibooking.no",
      },
    }
  );

  const { data, errors }: JSONResponse<CageballData[]> = await response.json();

  return data.filter((item) => item.available && item.bookable && new Date(item.from).getHours() >= 18 && new Date(item.to).getHours() <= 21);
};

export const getCageball = async (oneInstancePerDateSlot = true): Promise<CageballDate[]> => {
  const data = await getCageballData();

  return data.reduce<CageballDate[]>(
    (acc, item) =>
      oneInstancePerDateSlot && acc?.find((date) => date.from === item.from && date.to === item.to)
        ? [...acc]
        : [
            ...acc,
            {
              from: item.from,
              to: item.to,
              formattedToFromDate: `${formatFull(new Date(item.from))} - ${formatFull(new Date(item.to))}`,
              available: item.available,
              bookable: item.bookable,
              votes: [],
            },
          ],
    []
  );
};

export const importCageballData = async (): Promise<CageballEvent[]> => {
  const cageball = await getCageball();

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
          weekNumber: getISOWeek(new Date(cur.from)),
        },
      })
    )
  );

  return collection;
};

export const getCageballEvents = async (): Promise<CageballEvent[]> => {
  let events = await prisma.cageballEvent.findMany({
    where: {
      // Next week
      weekNumber: {
        equals: getISOWeek(new Date()) + 1,
      },
    },
  });

  if (events.length === 0) {
    events = await importCageballData();
  }

  return events;
};
