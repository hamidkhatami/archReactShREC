import { JalaliDateObject } from "@/utilities/date/JalaliDateObject";

export interface SidebarProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export interface SidebarState {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export interface JalaliDatePickerProps {
  value?: Date | string | null
  onChange?: (date: JalaliDateObject | null) => void
  disabled?: boolean
  className?: string
  label?:string
}
