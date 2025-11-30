import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TextField, FormHelperText, InputAdornment } from "@mui/material";
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
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    value ? new DateObject(value).convert(persian, persian_fa) : null
  );
  const [inputValue, setInputValue] = useState<string>(
    selectedDate ? selectedDate.format("YYYY/MM/DD") : ""
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    alert(value)
    if (value) {
      const dateObj = new DateObject(value).convert(persian, persian_fa);
      setSelectedDate(dateObj);
      setInputValue(dateObj.format("YYYY/MM/DD"));
    } else {
      setSelectedDate(null);
      setInputValue("");
    }
  }, [value]);

  // ولیدیشن و نرمال‌سازی تاریخ
  const validateAndFormat = (val: string) => {
    debugger
    if (!val) {
      setSelectedDate(null);
      setError("");
      if (onChange) onChange(null);
      return;
    }

    const cleaned = val.replace(/[^\d/]/g, "");
    const parts = cleaned.split("/").map((p) => p.trim());

    // سال ناقص
    if (!parts[0] || parts[0].length < 4) {
      setError("سال باید ۴ رقم باشد");
      return;
    }

    // ماه/روز ناقص
    if (!parts[1] || !parts[2]) {
      setError("ماه و روز کامل وارد نشده‌اند");
      return;
    }

    const normalized = `${parts[0]}/${parts[1].padStart(2, "0")}/${parts[2].padStart(2, "0")}`;

    try {
      const jDate = new DateObject({
        date: normalized,
        format: "YYYY/MM/DD",
        calendar: persian,
        locale: persian_fa,
      });
debugger
      if (jDate.isValid) {
        
        setSelectedDate(jDate);
        setInputValue(normalized);
        setError("");
        // if (onChange) onChange(jDate.toDate());
      } else {
        setError("تاریخ نامعتبر است");
      }
    } catch {
      setError(t("errors.invalidDate") || "تاریخ نامعتبر است");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError("");
  };

  const handleBlur = () => {
    validateAndFormat(inputValue);
  };

  const handleDateChange = (date: DateObject | null) => {
    debugger
    setSelectedDate(date);
    if (date) {
      const formatted = date.format("YYYY/MM/DD");
      setInputValue(formatted);
      if (onChange) onChange(date.toDate());
      setError("");
    } else {
      setInputValue("");
      if (onChange) onChange(null);
    }
  };

  return (
    <div className={className}>
      <DatePicker
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
              size="small"
              label={label}
              value={inputValue}
              onClick={openCalendar}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={!!error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarToday
                      style={{ cursor: "pointer" }}
                      onClick={openCalendar}
                    />
                  </InputAdornment>
                ),
                inputProps: { dir: "ltr", style: { textAlign: "left" } },
              }}
              disabled={disabled}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </>
        )}
      />
    </div>
  );
};

export default JalaliDatePicker;
