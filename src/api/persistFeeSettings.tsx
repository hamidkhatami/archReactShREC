import { getAxios } from "@/services/http";
import { FeeSetting, PersistResponse } from "@/types/inteface";

export async function persistProcessDate(payload: { setting: FeeSetting }): Promise<PersistResponse> {

  const axios = getAxios();
  const response = await axios.post<PersistResponse>(
    '/persist',
    payload
  );


  return response.data;
}