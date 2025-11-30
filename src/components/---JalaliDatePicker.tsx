import { useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { TextField } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'

import {JalaliDatePickerProps} from '@/types/inteface'



const JalaliDatePicke: React.FC<JalaliDatePickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  className
}) => {
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(
    value ? new DateObject(value).convert(persian, persian_fa) : null
  );

  const handleDateChange = (date: DateObject | null) => {
    setSelectedDate(date);
    
    if (onChange) {
      const gregorianDate = date ? date.convert(persian, persian_fa) : null;
      onChange(gregorianDate ? gregorianDate.toDate() : null);
    }
  };

  

  return (
    // <div className={className}>
    //   <DatePicker
    //     value={selectedDate}
    //     onChange={handleDateChange}
    //     calendar={persian}
    //     locale={persian_fa}
    //     calendarPosition="bottom-right"
    //     // disabled={disabled}
    //     render={(value, openCalendar) => (
    //       <TextField
    //         fullWidth
    //         label={label}
    //         value={value || ''}
    //         onClick={openCalendar}
    //         InputProps={{
    //           endAdornment: <CalendarToday color="action" />,
    //         //   readOnly: false
    //         }}
    //         // disabled={disabled}
    //       />
    //     )}
    //   />
    // </div>

<div className={className}>
    <DatePicker
  value={selectedDate}
  onChange={handleDateChange}
  calendar={persian}
  locale={persian_fa}
  calendarPosition="bottom-right"
  disabled={disabled}
  render={(value, openCalendar) => (
    <TextField
      fullWidth
      label={label}
      value={value || ""}
      onClick={openCalendar}

      // اجازه تایپ کردن
      onChange={(e) => {
        const input = e.target.value;

        // فقط اعداد و / قبول شود
        if (!/^[0-9/]*$/.test(input)) return;

        // تلاش تبدیل به DateObject
        try {
          const typedDate = new DateObject({
            date: input,
            format: "YYYY/MM/DD",
            calendar: persian,
            locale: persian_fa
          });

          if (typedDate?.isValid) {
            setSelectedDate(typedDate);
            handleDateChange(typedDate);
          }
        } catch (error) {
          // ورودی غلط → نادیده بگیر
        }
      }}

      InputProps={{
        endAdornment: <CalendarToday color="action" />,

        // readOnly را برمی‌داریم تا بتوان تایپ کرد
        readOnly: false
      }}
      disabled={disabled}
    />
  )}
/>
</div>

  );
};

export default JalaliDatePicker;