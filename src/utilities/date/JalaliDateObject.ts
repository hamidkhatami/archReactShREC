import DateObject, { Calendar, Locale } from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { validateJalaliDate } from "@/utilities/date/jalaliValidator";
import { toEnglishDigits } from "@/utilities/date/utility";
import { JalaliDateObjectOptions } from "@/types/inteface";
import gregorian from "react-date-object/calendars/gregorian";



export class JalaliDateObject {
  raw: string;
  format: string;
  isValid: boolean;
  calendar: Calendar;
  locale: Locale;
  private _dateObject: DateObject | null;

  constructor(input: string | DateObject, options: JalaliDateObjectOptions = {}) {
    this.format = options.format || "YYYY/MM/DD";
    this.calendar = options.calendar || persian;
    this.locale = options.locale || persian_fa;

    /** اگر ورودی از DatePicker بود */
    if (input instanceof DateObject) {
      

      this._dateObject = new DateObject({
        date: input,
        format: this.format,
        calendar: this.calendar,
        locale: this.locale,
      })
      // تبدیل به رشته با اعداد فارسی
      this.raw = this._dateObject.format(this.format); // حالا با locale صحیح
      this.isValid = true;
      return;
    }


    /** اگر ورودی رشته‌ای بود */
    

    const normalized = toEnglishDigits(input);
    this.isValid = validateJalaliDate(normalized);

    this.raw = normalized;


    
    this._dateObject = this.isValid
      ? new DateObject({
        date: normalized,
        format: this.format,
        calendar: this.calendar,
        locale: this.locale,
      })
      : null;
  }

  /** خروجی آبجکت تاریخ شمسی */
  get dateObject(): DateObject | null {
    return this._dateObject;
  }

  /** تاریخ شمسی فرمت شده */
  get formatted(): string {
    return this.isValid && this._dateObject
      ? this._dateObject.format(this.format)
      : this.raw;
  }

  /** خروجی میلادی به صورت Date برای API */
  get gregorian(): Date | null {
    return this._dateObject ? this._dateObject.toDate() : null;
  }

  /** متد مورد نیازت برای فرم سرچ */
  toGregorianDate(): DateObject | null {
    
    if (!this._dateObject) return null;

    return this._dateObject.convert(gregorian)
  }
}
