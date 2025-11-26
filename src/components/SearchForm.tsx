// src/components/SearchForm.tsx (Updated)

import React from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchStore } from '../store/searchStore';
import JalaliDatePicker from './JalaliDatePicker'; // کامپوننت شمسی

const departmentOptions = ['IT', 'HR', 'Finance', 'Marketing'];

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
        
        <Grid item xs={12} sm={8}>
          <TextField
            label="جستجوی متنی (نام یا نام کاربری)"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* ۲. فیلترهای جانبی */}
        
        {/* ستون تاریخ شمسی */}
        <Grid item xs={12} sm={4}>
          <JalaliDatePicker 
            label="تاریخ شروع کار از" 
            value={startDate}
            onChange={setStartDate}
          />
        </Grid>
        
        {/* ستون کمبو باکس (Autocomplete) */}
        <Grid item xs={12} sm={4}>
          <Autocomplete
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
          />
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
    </Box> 
  );
};

export default SearchForm;