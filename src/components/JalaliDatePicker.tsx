// JalaliDatePicker.tsx
import { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { TextField } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

interface JalaliDatePickerProps {
  label?: string;
  value?: Date | string;
  onChange?: (date: Date | null) => void;
  disabled?: boolean;
  className?: string;
}

const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
  label = 'تاریخ',
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
      const gregorianDate = date ? date.convert() : null;
      onChange(gregorianDate ? gregorianDate.toDate() : null);
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
          <TextField
            fullWidth
            label={label}
            value={value || ''}
            onClick={openCalendar}
            InputProps={{
              endAdornment: <CalendarToday color="action" />,
              readOnly: true
            }}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};

export default JalaliDatePicker;