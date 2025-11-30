import React, { useRef, useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TextField from "@mui/material/TextField";
import EventIcon from "@mui/icons-material/Event";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
};

const padIfNeeded = (s: string, len = 2) =>
  s.length === 1 ? "0" + s : s;

const normalizeInput = (raw: string) => {
  const cleaned = raw.replace(/[^\d/]/g, "");
  const parts = cleaned.split("/").map((p) => p.trim());
  const y = parts[0] ?? "";
  const m = parts[1] ?? "";
  const d = parts[2] ?? "";

  const mm = m ? padIfNeeded(m) : m;
  const dd = d ? padIfNeeded(d) : d;

  if (parts.length === 1) return y;
  if (parts.length === 2) return `${y}/${m}`;
  return `${y}/${mm}/${dd}`;
};

export default function PersianDateInput({
  value,
  onChange,
  label = "تاریخ",
  placeholder = "YYYY/MM/DD",
}: Props) {
  const dpRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setInputValue(value || "");
    setError("");
  }, [value]);

  const liveValidate = (val: string) => {
    if (!val) {
      setError("");
      return;
    }
    const parts = val.split("/").filter(Boolean);
    if (parts[0] && parts[0].length < 4) {
      setError("سال را کامل وارد کنید");
      return;
    }
    if (parts.length === 3) {
      try {
        const jDate = new DateObject({
          date: val,
          format: "YYYY/MM/DD",
          calendar: persian,
          locale: persian_fa,
        });
        setError(jDate.isValid ? "" : "تاریخ نامعتبر است");
      } catch {
        setError("تاریخ نامعتبر است");
      }
      return;
    }
    setError("");
  };

  const blurValidate = (val: string) => {
    const parts = val.split("/").map((p) => p.trim());
    if (!val) {
      setError("");
      onChange("");
      return;
    }
    if (!parts[0] || parts[0].length < 4) {
      setError("سال نامعتبر است");
      return;
    }
    if (!parts[1] || !parts[2]) {
      setError("تاریخ کامل نیست");
      return;
    }
    const normalized = `${parts[0]}/${padIfNeeded(
      parts[1]
    )}/${padIfNeeded(parts[2])}`;

    try {
      const jDate = new DateObject({
        date: normalized,
        format: "YYYY/MM/DD",
        calendar: persian,
        locale: persian_fa,
      });

      if (jDate.isValid) {
        setError("");
        setInputValue(normalized);
        onChange(normalized);
      } else {
        setError("تاریخ واردشده معتبر نیست");
      }
    } catch {
      setError("تاریخ معتبر نیست");
    }
  };

  const handleInputChange = (raw: string) => {
    const normLike = normalizeInput(raw);
    setInputValue(normLike);
    liveValidate(normLike);
  };

  const handleSelectFromCalendar = (d: any) => {
    if (!d) {
      setInputValue("");
      onChange("");
      setError("");
      return;
    }
    const jDate: DateObject = Array.isArray(d) ? d[0] : d;
    if (jDate?.isValid) {
      const formatted = `${jDate.year}/${String(jDate.month).padStart(
        2,
        "0"
      )}/${String(jDate.day).padStart(2, "0")}`;
      setInputValue(formatted);
      setError("");
      onChange(formatted);
    } else {
      setError("تاریخ نامعتبر است");
    }
  };

  return (
    <Box sx={{ width: 220, direction: "rtl" }}>
      <DatePicker
        ref={dpRef}
        value={inputValue || undefined}
        onChange={handleSelectFromCalendar}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        // onlyOneCalendar
        calendarPosition="bottom-right"
        render={() => (
          <TextField
            fullWidth
            size="small"
            label={label}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={() => blurValidate(inputValue)}
            error={!!error}
            helperText={error}
            // inputRef={ref}
            dir="rtl"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  
                </InputAdornment>
              ),
            }}
            sx={{
              "& input": { textAlign: "left", fontSize: 14, padding: "6px 8px" },
              "& .MuiFormHelperText-root": { fontSize: "12px", color: "red" },
            }}
            // onKeyDown={(e) => {
            //   if (e.key === "ArrowDown") {
            //     e.preventDefault();
            //     openCalendar();
            //   }
            // }}
          />
        )}
      />
    </Box>
  );
}
