import { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TextField, FormHelperText, InputAdornment } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { JalaliDateObject } from "@/utilities/date/JalaliDateObject";
import { JalaliDatePickerProps } from "@/types/inteface";
import { validateJalaliDate } from "@/utilities/date/jalaliValidator";
import { t } from "i18next";


const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
  onError,
  label,
  onChange,
  disabled = false,
  defaultValue
}) => {


  const [error, setError] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<JalaliDateObject | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (selectedDate) {
      setInputValue(selectedDate.formatted);
      onChange?.(selectedDate)
    } else {
      setInputValue("");
    }
  }, [selectedDate]);

  useEffect(() => {
    if (defaultValue) {
      const dj = new JalaliDateObject(defaultValue);
      setInputValue(dj?.formatted);
      setSelectedDate(dj);
      onChange?.(dj)
    } else {
      setInputValue("");
    }
  }, [defaultValue]);


  const setErrorAndNotify = (msg: string | null) => {
    setError(msg ?? "");
    onError?.(msg == null);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d/]/g, "");
    setInputValue(cleaned);

    if (validateJalaliDate(cleaned)) {
      const jDate = new JalaliDateObject(cleaned);
      setSelectedDate(jDate);

      setErrorAndNotify(null);
      onChange?.(jDate);
    }
    else
      setErrorAndNotify(t("validations.3002"));

  };

  const handleDateChange = (val: DateObject) => {
    if (!val) {
      const jDate = new JalaliDateObject("");
      setSelectedDate(null);
      setInputValue("");
      onChange?.(jDate);

      setErrorAndNotify(t("validations.3003"))
      return;
    }


    const jDate = new JalaliDateObject(val);
    setSelectedDate(jDate);
    setInputValue(jDate.formatted);
    setErrorAndNotify(null);
    onChange?.(jDate);
  };

  const padIfNeeded = (val: string) =>
    val.length === 1 ? `0${val}` : val;

  const blurValidate = (val: string) => {
    if (!val) {

      setErrorAndNotify(t("validations.3002"));
      setInputValue("");
      setSelectedDate(null);
      return;
    }

    const parts = val.split("/").map((p) => p.trim());

    if (!parts[0] || parts[0].length < 4) {

      setErrorAndNotify(t("validations.3002"));
      return;
    }

    if (!parts[1] || !parts[2]) {

      setErrorAndNotify(t("validations.3002"));
      return;
    }

    const normalized = `${parts[0]}/${padIfNeeded(parts[1])}/${padIfNeeded(
      parts[2]
    )}`;

    try {
      const jDate = new JalaliDateObject(normalized);

      if (!jDate.isValid) {

        setErrorAndNotify(t("validations.3002"));
        return;
      }

      // ✅ معتبر
      setErrorAndNotify(null);
      setInputValue(jDate.formatted);
      setSelectedDate(jDate);
      onChange?.(jDate);

    } catch {

      setErrorAndNotify(t("validations.3002"));
    }
  };


  return (

    <DatePicker
      value={selectedDate?.dateObject}
      onChange={handleDateChange}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      disabled={disabled}
      render={(_, openCalendar) => (
        <>
          <TextField
            fullWidth
            size="small"
            label={label}
            value={inputValue}
            defaultValue={defaultValue}
            onClick={openCalendar}
            onChange={handleInputChange}
            onBlur={() => blurValidate(inputValue)}
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
                  textAlign: "right",
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

  );
};

export default JalaliDatePicker;
