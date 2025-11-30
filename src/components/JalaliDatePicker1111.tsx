import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TextField, FormHelperText } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { JalaliDatePickerProps } from "@/types/inteface";




const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  className,
}) => {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    value ? new DateObject(value).convert(persian, persian_fa) : null
  );
  const [inputValue, setInputValue] = useState<string>(

    selectedDate ? selectedDate.format("YYYY/MM/DD") : ""
  );
  const [error, setError] = useState<string>("");

  // هر بار selectedDate تغییر کرد، inputValue را هم آپدیت کن
  useEffect(() => {
    setInputValue(selectedDate ? selectedDate.format("YYYY/MM/DD") : "");
  }, [selectedDate]);


  useEffect(() => {
    if (value) {
      setSelectedDate(new DateObject(value).convert(persian, persian_fa));
    } else {
      setSelectedDate(null);
    }
  }, [value]);


  // هنگام تایپ:
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // تلاش تبدیل به DateObject فقط وقتی طول مناسب است یا فرمت درست
    if (/^\d{4}\/\d{0,2}\/\d{0,2}$/.test(value)) {
      try {
        const typedDate = new DateObject({
          date: value,
          format: "YYYY/MM/DD",
          calendar: persian,
          locale: persian_fa,
        });
        if (typedDate.isValid) setSelectedDate(typedDate);
      } catch {
        setError(t("errors.invalidDate"));
      }
    }
    else setError(t("errors.empty"));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const input = e.target.value;
    setInputValue(input);

    // اگر input خالی شد
    if (!input) {
      setSelectedDate(null);
      if (onChange) onChange(null);
      setError(t("errors.empty"));
      return;
    }
    if (/^\d{4}\/\d{0,2}\/\d{0,2}$/.test(input)) {
      try {
        // تبدیل input به DateObject
        const typedDate = new DateObject({
          date: input,
          format: "YYYY/MM/DD",
          calendar: persian,
          locale: persian_fa,
        });

        if (typedDate?.isValid) {
          setSelectedDate(typedDate);
          if (onChange) onChange(typedDate.convert(persian, persian_fa).toDate());
          setError(t("errors.invalidDate"));
        } else {
          setError(t("errors.invalidDate"));
        }
      } catch {
        setError(t("errors.invalidDate"));
      }
    }
  };


  const handleDateChange = (date: DateObject | null) => {
    setSelectedDate(date);

    if (onChange) {
      const gregorianDate = date ? date.convert(persian, persian_fa) : null;
      onChange(gregorianDate ? gregorianDate.toDate() : null);
    }
    setError(""); // خطا را پاک می‌کنیم
  };


  return (
    <div className={className}>
      {/* <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        disabled={disabled}
        render={(value, openCalendar) => (
          <>
            <TextField
              fullWidth
              label={label}
              value={inputValue}
              onClick={openCalendar}
              onChange={handleInputChange}
              error={!!error}
              InputProps={{
                endAdornment: <CalendarToday color="action" />,
              }}
              disabled={disabled}
              inputProps={{ dir: "rtl" }}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </>
        )}
      /> */}
      <DatePicker
  value={selectedDate}
  onChange={handleDateChange}
  calendar={persian}
  locale={persian_fa}
  calendarPosition="bottom-right"
  disabled={disabled}
  keepInvalidDates  // ← مهم برای جلوگیری از پرش
  render={(value, openCalendar) => (
    <>
      <TextField
        fullWidth
        label={label}
        value={inputValue}  // ← state جدا برای input
        onClick={openCalendar}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val); // فقط input را کنترل کن

          // اگر رشته معتبر بود، selectedDate را آپدیت کن
          if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(val)) {
            try {
              const typedDate = new DateObject({
                date: val,
                format: "YYYY/MM/DD",
                calendar: persian,
                locale: persian_fa,
              });
              if (typedDate.isValid) {
                setSelectedDate(typedDate);
                if (onChange) onChange(typedDate.toDate());
                setError(""); // خطا پاک شود
              }
            } catch {
              setError("تاریخ نامعتبر است");
            }
          } else if (val === "") {
            setSelectedDate(null);
            if (onChange) onChange(null);
            setError(""); // خطای خالی
          } else {
            setError("تاریخ نامعتبر است");
          }
        }}
        error={!!error}
        InputProps={{
          endAdornment: <CalendarToday color="action" />,
        }}
        disabled={disabled}
        inputProps={{ dir: "rtl" }}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </>
  )}
/>

    </div>
  );
};

export default JalaliDatePicker;
