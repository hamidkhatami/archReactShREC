import { getAxios } from "@/services/http";
import { ProcessDataResponse } from "@/types/inteface";

export async function persistProcessDate(payload: { processDate: string }): Promise<ProcessDataResponse> {

  const axios = getAxios();
  const response = await axios.post<ProcessDataResponse>(
    '/process',
    payload
  );


  return response.data;
}