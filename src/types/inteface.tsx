import { JalaliDateObject } from "@/utilities/date/JalaliDateObject";
import DateObject, { Calendar, Locale } from "react-date-object";
import { Status } from "./enum";

export interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export interface SidebarState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export interface JalaliDatePickerProps {
  onChange?: (date: JalaliDateObject) => void
  disabled?: boolean
  label?: string
  onError?: (error: boolean) => void;   // 👈 جدید
  defaultValue?: DateObject | null;

}
export interface JalaliDateObjectOptions {
  format?: string;
  calendar?: Calendar;
  locale?: Locale;
}

export interface StartDateModel {
  jalaliDate: JalaliDateObject | null;
  gregorianDate: DateObject | null;
}
export interface DashboardResult {
  faFileName: string
  enFileName: string
  processStatus: Status
  processDate: string
  errorCode: string
  user: string

}

export interface DashboardResponse {
  PROCESS_RESULT: DashboardResult[];
}

export interface ProcessDateParam {
  processDate: string
  setProcessDate: (processDate: string) => void;
}

export interface ServerErrorResponse {
  SERVER_ERROR: string;
}

export interface LoginResponse {
  RES: Boolean;

}
export interface FeeSetting {
  id: number
  transactionType: string
  terminalType: string,
  acquirer: number,
  shetab: number,
  issuer: number,
  bankDes: number
}

export interface PersistResponse {
  RES: string
}

export interface ProcessDataResponse {
    RES:string
}