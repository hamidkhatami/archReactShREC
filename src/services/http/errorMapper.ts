import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  fieldErrors?: Record<string, string>;
  status?: number;
}

export const mapAxiosError = (error: AxiosError): ApiError => {
  const status = error.response?.status;
  const data: any = error.response?.data;

  // مثال: Validation Error
  if (status === 400 && data?.errors) {
    return {
      message: "اطلاعات وارد شده نامعتبر است",
      fieldErrors: data.errors,
      status,
    };
  }

  if (status === 401) {
    return { message: "دسترسی غیرمجاز", status };
  }

  if (status === 500) {
    return { message: "خطای سرور، بعداً تلاش کنید", status };
  }

  return {
    message: "خطای ناشناخته",
    status,
  };
};
