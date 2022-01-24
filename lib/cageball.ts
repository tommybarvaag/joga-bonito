import { CageballData, CageballInstance, JSONResponse } from "@/types";
import { dateNextWeek, formatFull, formatYmd } from "@/utils/date";

export const getCageballData = async (): Promise<CageballData[]> => {
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

export const getCageball = async (): Promise<{ [key: string]: CageballInstance[] }> => {
  const data = await getCageballData();

  // Accumulate all instances
  //return data.reduce<CageballInstance[]>((acc, item) => [...acc, ...item.instances.flat()], []);

  // Return only one instance per date slot
  return data.reduce<{ [key: string]: CageballInstance[] }>(
    (acc, item) => ({
      ...acc,
      [formatFull(new Date(item.from))]: item.instances.flat(),
    }),
    {}
  );
};
