import { getAxios } from "@/services/http";
import { LoginResponse } from "@/types/inteface";

export async function fetchLogin(user: { userName: string, password: string }): Promise<LoginResponse> {

  const axios = getAxios();
  const response = await axios.post<LoginResponse>(
    '/login',
    user
  );


  return response.data;
}