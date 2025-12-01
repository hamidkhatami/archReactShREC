import DateObject, { Calendar, Locale } from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { validateJalaliDate } from "@/utilities/date/jalaliValidator";

interface JalaliDateObjectOptions {
  format?: string;
  calendar?: Calendar;
  locale?: Locale;
}

export class JalaliDateObject {
  raw: string;
  format: string;
  isValid: boolean;
  calendar: Calendar;
  locale: Locale;
  private _dateObject: DateObject | null;

  constructor(input: string, options: JalaliDateObjectOptions = {}) {
    this.raw = input;
    this.format = options.format || "YYYY/MM/DD";
    this.calendar = options.calendar || persian;
    this.locale = options.locale || persian_fa;

    this.isValid = validateJalaliDate(input);

    this._dateObject = this.isValid
      ? new DateObject({
          date: input,
          format: this.format,
          calendar: this.calendar,
          locale: this.locale,
        })
      : null;
  }

  get dateObject(): DateObject | null {
    return this._dateObject;
  }

  get formatted(): string {
    return this.isValid && this._dateObject
      ? this._dateObject.format(this.format)
      : this.raw;
  }
}
