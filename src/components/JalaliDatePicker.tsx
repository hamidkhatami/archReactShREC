// import { useState, useEffect } from "react";
// import DatePicker, { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import { TextField, FormHelperText, InputAdornment } from "@mui/material";
// import { CalendarToday } from "@mui/icons-material";
// import { useTranslation } from "react-i18next";
// import { JalaliDatePickerProps } from "@/types/inteface";
// import { JalaliDateObject } from "@/utilities/date/JalaliDateObject"

// const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
//     label,
//     value,
//     onChange,
//     disabled = false,
//     className,
// }) => {
//     const { t } = useTranslation();

//     const [selectedDate, setSelectedDate] = useState<JalaliDateObject | null>(
//         value ? new JalaliDateObject(value)  : null
//     );
//     const [inputValue, setInputValue] = useState<string>(
//         selectedDate ? selectedDate.raw : ""
//     );
//     const [error, setError] = useState<string>("");

//     useEffect(() => {
//         alert(value)
//         if (value) {
//             const dateObj = new JalaliDateObject(value).convert( persian, persian_fa);
//             setSelectedDate(dateObj);
//             setInputValue(dateObj.format("YYYY/MM/DD"));
//         } else {
//             setSelectedDate(null);
//             setInputValue("");
//         }
//     }, [value]);

//     // ولیدیشن و نرمال‌سازی تاریخ
//     const validateAndFormat = (val: string) => {
//         debugger 
//         if (!val) {
//             setSelectedDate(null)
//             setError("")
//             if (onChange) onChange(null)
//             return;
//         }

//         const cleaned = val.replace(/[^\d/]/g, "")
//         const jalaliDateRegex = /^(13|14)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/
//         if(!val.match(jalaliDateRegex)) {
//             setSelectedDate(null)
//             setInputValue(""); 
//             setError("تارخ درت وارد نشده است")
//             // if (onChange) onCha nge(null) 
//           //   return           

//         }
//         const parts = cleaned.split("/").map((p) => p.trim());

//         // // سال ناقص
//         // if (!parts[0] || parts[0].length < 4) {
//         //     alert("1")
//         //     setError("سال باید ۴ رقم باشد");
//         //     return;
//         // }

//         // // ماه/روز ناقص
//         // if (!parts[1]  )  {
//         //     alert("a")
//         //     setError("ماه و روز کامل وارد نشده‌اند");
//         //     return;
//         // }
// debugger  

//         //const normalized = `${parts[0]}/${parts[1].padStart(2, "0")}/${parts[2].padStart(2, "0")}`;
        
        

//         try {
//             const jDate= new JalaliDateObject(val);
//             // const jDate = new DateObject({
//             //     date: val,
//             //     format: "YYYY/MM/DD",
//             //     calendar: persian,
//             //     locale: persian_fa,
//             // });
//             alert(jDate.isValid)
//             if (jDate.isValid) {

//                 setSelectedDate(jDate);
//                 // setInputValue(normalized);
//                 setError("");
//                 // if (onChange) onChange(jDate.toDate());
//             } else {
//                 setError("تاریخ نامعتبر سسسساست");
//             }
//             jDate.isValid=true
//         } catch(error: unknown) {
//             alert("catch call")

//             setError(t("errors.invalidDate") || "تاریخ نامعتبر است");
//         }
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInputValue(e.target.value);
//         setError("");
//     };

//     const handleBlur = () => {
 
//         validateAndFormat(inputValue);
//     };

//     const handleDateChange = (date: JalaliDateObject | null) => {
// debugger 
//         setSelectedDate(date?.raw);
//         if (date?.raw) {

//             const formatted = date.dateObject?.date;
//             setInputValue(formatted);
//             if (onChange) onChange(date.dateObject?.date  );
//             setError("");
//         } else {
//             setInputValue("");
//             if (onChange) onChange(null);
//         }
//     };

//     return (
//         <div className={className}>
//             <DatePicker
//                 value={selectedDate?.dateObject?.date || null}
//                 // onChange={handleDateChange}
//                   onChange={(d) => handleDateChange(new JalaliDateObject(d?.format("YYYY/MM/DD")))}

//                 calendar={persian}
//                 locale={persian_fa}
//                 calendarPosition="bottom-right"
//                 disabled={disabled}
//                 render={(value, openCalendar) => (
//                     <>
//                         <TextField
//                             fullWidth
//                             size="small"
//                             label={label}
//                             // value={inputValue}
//                             onClick={openCalendar}
//                             onChange={handleInputChange}
//                             onBlur={handleBlur}
//                             error={!!error}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <CalendarToday
//                                             style={{ cursor: "pointer" }}
//                                             onClick={openCalendar}
//                                         />
//                                     </InputAdornment>
//                                 ),
//                                 inputProps: { dir: "ltr", style: { textAlign: "left" } },
//                             }}
//                             disabled={disabled}
//                         />
//                         {error && <FormHelperText error>{error}</FormHelperText>}
//                     </>
//                 )}
//             />
//         </div>
//     );
// };

// export default JalaliDatePicker;


import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TextField, FormHelperText, InputAdornment } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { JalaliDatePickerProps } from "@/types/inteface";
import { JalaliDateObject } from "@/utilities/date/JalaliDateObject";

const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  className,
}) => {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState<JalaliDateObject | null>(
    value ? new JalaliDateObject(value) : null
  );
  const [inputValue, setInputValue] = useState<string>(
    selectedDate?.raw || ""
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (value) {
      const dateObj = new JalaliDateObject(value);
      setSelectedDate(dateObj);
      setInputValue(dateObj.formatted);
    } else {
      setSelectedDate(null);
      setInputValue("");
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError("");
  };

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
    // onChange?.(jDate.dateObject?.toDate() || null);
  };

  const handleDateChange = (val: any) => {
    if (!val) {
      setSelectedDate(null);
      setInputValue("");
      onChange?.(null);
      return;
    }

    const jDate = new JalaliDateObject(val);
    setSelectedDate(jDate);
    setInputValue(jDate.formatted);
    setError("");
    onChange?.(jDate.dateObject?.toDate() || null);
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
