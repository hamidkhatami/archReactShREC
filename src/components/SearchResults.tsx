// src/components/SearchResults.tsx (Updated)

import React from 'react';
import { Typography, CircularProgress, Alert, List, ListItem, ListItemText, Paper, Box } from '@mui/material';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { useSearchStore } from '../store/searchStore';

const SearchResults: React.FC = () => {
  const { submitTerm, submitFilters } = useSearchStore();
  const { data, isLoading, isError, error } = useSearchQuery();

  // چک می‌کنیم که حداقل یکی از فیلترها مقدار داشته باشد تا چیزی نمایش دهیم
  const isFilterActive = !!submitTerm || submitFilters.searchType !== 'All' || !!submitFilters.department || !!submitFilters.startDate;

  if (!isFilterActive) {
    return (
      <Alert severity="info" dir="rtl">
        برای شروع جستجو، فیلدهای فرم را پر کنید و دکمه جستجو را بزنید.
      </Alert>
    );
  }

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress dir="rtl" /></Box>;
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : "خطای ناشناخته.";
    return <Alert severity="error" dir="rtl">خطا در جستجو: {errorMessage}</Alert>;
  }

  if (!data || data.length === 0) {
    return (
      <Alert severity="warning" dir="rtl">
        نتیجه‌ای با فیلترهای انتخابی شما یافت نشد.
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom dir="rtl">
        نتایج یافت شده ({data.length} مورد)
      </Typography>
      <List dir="rtl">
        {data.map((result) => (
          <ListItem key={result.id} divider>
            <ListItemText
              primary={result.name}
              secondary={`
                نقش: ${result.userType} | دپارتمان: ${result.department} | تاریخ شروع: ${result.joinDate}
              `}
              sx={{ textAlign: 'right' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SearchResults;