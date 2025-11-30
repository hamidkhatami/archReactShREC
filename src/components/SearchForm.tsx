
import React from 'react'
import {
  TextField,
  Button,
  Box,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Grid
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchStore } from '@/store/searchStore'
import JalaliDatePicker from '@/components/JalaliDatePicker1111' // کامپوننت شمسی
import { departmentOptions } from '@/consts/constants'
import { useTranslation } from 'react-i18next'
import {JalaliDatePickerProps} from '@/types/inteface'
import PersianDateInput from './PersianDateInput'

const SearchForm: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchType,
    setSearchType,
    department,
    setDepartment,
    startDate,
    setStartDate,
    submitAll
  } = useSearchStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAll(); // اجرای اکشن ترکیبی Zustand
  };


  const handleDate = (e: JalaliDatePickerProps) => {
    //setStartDate(e.value?.toString());
    alert(e.value?.toString)

  }

   const [date, setDate] = React.useState<DateObject | null>(null);

  const { t , i18n } = useTranslation();

  // چک کردن اینکه فرم کاملاً خالی نباشد تا دکمه فعال شود
  const isFormEmpty = !searchTerm && searchType === 'All' && !department && !startDate;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      dir="rtl"
    // sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>

          <Autocomplete
            options={departmentOptions}

            // ***** مقدار انتخاب‌شده باید خود آبجکت باشد *****
            value={
              department
                ? departmentOptions.find((item) => item.key === department) || null
                : null
            }

            // وقتی انتخاب تغییر کرد
            onChange={(_, newValue) => {
              setDepartment(newValue ? newValue.key : "");
            }}

            // چه چیزی نمایش داده شود
            getOptionLabel={(option) => option.value}

            // کمک برای تشخیص آیتم انتخابی
            isOptionEqualToValue={(option, value) => option.key === value.key}

            renderInput={(params) => (
              <TextField
                {...params}
                label="دپارتمان"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    textAlign: "right",
                    "& input": {
                      textAlign: "left",   // متن انتخاب‌شده راست‌چین شود
                    },
                  },
                }}
              />
            )}



            fullWidth
            dir="ltr"
            sx={{
              "& .MuiAutocomplete-endAdornment": { left: 14, right: "auto" },
            }}
          />

        </Grid>
        <Grid item xs={12} sm={4}>
        <Autocomplete
          multiple
          options={departmentOptions.map((item) => ({
            label: item.value,
            id: item.key,
          }))}

          value={
            department.length > 0
              ? departmentOptions
                .map((d) => ({ label: d.value, id: d.key }))
                .filter((opt) => department.includes(opt.id))
              : []
          }

          onChange={(_, newValues) => {
            // newValues = array of {label, id}
            setDepartment(newValues.map((item) => item.id));
          }}

          renderInput={(params) => (
            <TextField
              {...params}
              label="دپارتمان"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                sx: {
                  textAlign: "right",
                  "& input": {
                    textAlign: "right", // متن ورودی راست‌چین
                  },
                },
              }}
            />
          )}

          dir="rtl"
          fullWidth

          // تنظیم آیکون‌ها برای سمت چپ
          slotProps={{
            endAdornment: {
              sx: {
                left: 8,
                right: "auto",
                flexDirection: "row-reverse",
              },
            },
            popupIndicator: {
              sx: { mr: 1 },
            },
            clearIndicator: {
              sx: { ml: 1 },
            },
            // چپ‌چین شدن chips
            listbox: {
              sx: { textAlign: "right" },
            },
          }}

          sx={{
            "& .MuiChip-root": {
              direction: "rtl",
            },
          }}
        />
</Grid>



      <Grid item xs={12} sm={4}>
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
          disabled={isFormEmpty}
          sx={{ whiteSpace: 'nowrap', height: '56px', width: '100%' }}
        >
          جستجوی پیشرفته
        </Button>
      </Grid>

    
       <Grid item xs={12} sm={4}>
        <JalaliDatePicker
          label={t('labels.startDate')}
          value={startDate}
          onChange={setStartDate}
        />
      </Grid>
       {/* <PersianDateInput
  value={date}
  onChange={setDate}
  label="تاریخ تولد"
/>; */}


      {/* ستون کمبو باکس (Autocomplete) */}
      <Grid item xs={12} sm={4}>
        {/* <Autocomplete
            options={departmentOptions}
            value={department || null} // برای جلوگیری از warning در MUI
            onChange={(_, newValue: string | null) => setDepartment(newValue || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="دپارتمان"
                variant="outlined"
              />
            )}
            fullWidth
            dir="rtl"
            // اصلاحات RTL برای قرارگیری درست آیکون‌ها
            sx={{
              '& .MuiAutocomplete-endAdornment': { left: 14, right: 'auto' },
            }}
          /> */}
      </Grid>

      {/* ستون رادیو باتن */}
      <Grid item xs={12} sm={4}>
        <FormControl component="fieldset" dir="rtl" sx={{ width: '100%' }}>
          <FormLabel component="legend" sx={{ textAlign: 'right' }}>
            نقش سازمانی
          </FormLabel>
          <RadioGroup
            row
            name="user-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as UserType)}
            sx={{
              justifyContent: 'flex-end',
            }}
          >
            <FormControlLabel value="All" control={<Radio />} label="همه" />
            <FormControlLabel value="Admin" control={<Radio />} label="مدیر" />
            <FormControlLabel value="User" control={<Radio />} label="کاربر" />
          </RadioGroup>
        </FormControl>
      </Grid>

    </Grid>
    </Box >
  );
};

export default SearchForm;