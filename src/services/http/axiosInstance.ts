import axios, { AxiosInstance } from "axios";
import { getRuntimeConfig } from "@/config/appConfig";


export function getAxios(): AxiosInstance {

  const cfg = getRuntimeConfig();

  if (cfg) {
    debugger

    return axios.create({
      baseURL: `${cfg.API_BASE_URL}:${cfg.PORT}/${cfg.MAIN}/${cfg.VERSION}`,
      timeout: 1500000000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return axios.create({
    baseURL: `/`,
    timeout: 1500000000,
    headers: {
      "Content-Type": "application/json",
    },
  });;
}
