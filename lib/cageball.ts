import { CageballResponse, JSONResponse } from "@/types";

export const getCageball = async (): Promise<CageballResponse> => {
  const response = await fetch("https://api.ibooking.no/v1/resource_instances?slots=1&studio_id=1026&resource_category_id=783&from=2022-01-21&to=2022-01-21", {
    method: "GET",
    headers: {
      "x-ibooking-origin-hostname": "huseklepparena.ibooking.no",
    },
  });

  const { data, errors }: JSONResponse<CageballResponse> = await response.json();

  return data;
};
