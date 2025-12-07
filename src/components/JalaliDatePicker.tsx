import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { TextField, FormHelperText, InputAdornment } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";

import { JalaliDateObject } from "@/utilities/date/JalaliDateObject";
import { JalaliDatePickerProps } from "@/types/inteface";

const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  className,
}) => {
  const [selectedDate, setSelectedDate] = useState<JalaliDateObject | null>(
    value ? new JalaliDateObject( value) : null
    
  );
  const [inputValue, setInputValue] = useState<string>(
    selectedDate?.formatted || ""
  );
  const [error, setError] = useState<string>("");

  //
  // sync props.value → component
  //
  useEffect(() => {
    if (value) {
      const j = new JalaliDateObject(value);
      setSelectedDate(j);
      setInputValue(j.formatted);
    } else {
      setSelectedDate(null);
      setInputValue("");
    }
  }, [value]);

  //
  // تایپ دستی
  //
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d/]/g, "");
    setInputValue(cleaned);
    setError("");
  };

  //
  // تایید پس از blur
  //
  const handleBlur = () => {
    const val = inputValue.trim();

    if (!val) {
      setSelectedDate(null);
      setError("");
      onChange?.(null);
      return;
    }

    const jDate = new JalaliDateObject(val);
    if (!jDate.isValid) {
      setError("تاریخ نامعتبر است");
      return;
    }

    setSelectedDate(jDate);
    setInputValue(jDate.formatted);
    setError("");
    onChange?.(jDate.formatted);
  };

  //
  // انتخاب از تقویم
  //
  const handleDateChange = (val: any) => {
    if (!val) {
      setSelectedDate(null);
      setInputValue("");
      onChange?.(null);
      return;
    }

    const formatted = val.format("YYYY/MM/DD");
    const jDate = new JalaliDateObject(formatted);

    setSelectedDate(jDate);
    setInputValue(jDate.formatted);
    setError("");
    onChange?.(jDate.formatted);
  };

  return (
    <div className={className}>
      <DatePicker
        value={selectedDate?.dateObject || null}
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
                inputProps: {
                  dir: "ltr",
                  style: {
                    textAlign: "left",
                    fontFamily: "monospace",
                    letterSpacing: "1px",
                  },
                },
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
