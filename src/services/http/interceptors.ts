import { getAxios } from "@/services/http/axiosInstance";
import { AxiosError } from "axios";

getAxios()?.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

getAxios()?.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {

    return Promise.reject(error);
  }
);
