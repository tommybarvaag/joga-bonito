import { CageballData, CageballDate, JSONResponse } from "@/types";
import { dateNextWeek, formatFull, formatYmd } from "@/utils/date";

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
