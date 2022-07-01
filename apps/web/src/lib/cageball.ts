import { dateNextWeek, formatCageballEventDateAndTime, formatYmd } from "@/utils/date";
import { CageballData, CageballDate, JSONResponse, Unpacked } from "@joga-bonito/types";
import { Prisma } from "@prisma/client";
import { getISOWeek } from "date-fns";
import prisma from "./prisma";

export type CageballEventWithVotesAndUser = Unpacked<Prisma.PromiseReturnType<typeof getCageballEventsWithVotesAndUser>>;

const getCageballData = async (weekNumber?: number): Promise<CageballData[]> => {
  const response = await fetch(
    `https://api.ibooking.no/v1/resource_instances?slots=1&studio_id=1026&resource_category_id=783&from=${formatYmd(
      dateNextWeek("monday", weekNumber)
    )}&to=${formatYmd(dateNextWeek("friday", weekNumber))}`,
    {
      method: "GET",
      headers: {
        "x-ibooking-origin-hostname": "huseklepparena.ibooking.no",
      },
    }
  );

  const { data, errors }: JSONResponse<CageballData[]> = await response.json();

  return data.filter((item) => new Date(item.from).getHours() >= 18 && new Date(item.to).getHours() <= 21);
};

export const getCageball = async (weekNumber?: number, oneInstancePerDateSlot = true): Promise<CageballDate[]> => {
  const data = await getCageballData(weekNumber);

  return data.reduce<CageballDate[]>(
    (acc, item) =>
      oneInstancePerDateSlot && acc?.find((date) => date.from === item.from && date.to === item.to)
        ? [...acc]
        : [
            ...acc,
            {
              id: "",
              from: item.from,
              to: item.to,
              formattedToFromDate: `${formatCageballEventDateAndTime(new Date(item.from))} - ${formatCageballEventDateAndTime(new Date(item.to))}`,
              weekNumber: getISOWeek(new Date(item.from)),
              available: data.some((i) => i.from === item.from && i.to === item.to && i.available),
              bookable: data.some((i) => i.from === item.from && i.to === item.to && i.bookable),
              votes: [],
            },
          ],
    []
  );
};

export const importCageballData = async (weekNumber?: number): Promise<CageballEventWithVotesAndUser[]> => {
  const cageball = await getCageball(weekNumber);

  // Remove await to test "fire and forget" with github actions
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

  // Return mapped data while "fire and forget" action is running
  return cageball.map((cur) => ({
    available: cur.available,
    bookable: cur.bookable,
    formattedToFromDate: cur.formattedToFromDate,
    from: new Date(cur.from),
    to: new Date(cur.to),
    weekNumber: getISOWeek(new Date(cur.from)),
    id: "",
    votes: [],
  }));
};

const getCageballEventsWithVotesAndUser = async (weekNumber?: number) =>
  await prisma.cageballEvent.findMany({
    where: {
      // Next week
      weekNumber: {
        equals: weekNumber ?? getISOWeek(new Date()) + 1,
      },
    },
    include: {
      votes: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              id: true,
              image: true,
            },
          },
        },
      },
    },
  });

export const getCageballEvents = async (weekNumber?: number): Promise<CageballEventWithVotesAndUser[]> => {
  let events = await getCageballEventsWithVotesAndUser(weekNumber);

  if (events.length === 0) {
    events = await importCageballData(weekNumber);
  }

  return (
    events
      ?.filter((event) => event.from.getUTCDay() < 5 && event.from.getUTCHours() > 16 && event.to.getUTCHours() < 20)
      ?.sort((a, b) => a.from.getTime() - b.from.getTime()) ?? []
  );
};
