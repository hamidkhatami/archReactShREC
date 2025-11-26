// src/App.tsx (Updated)

import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom dir="rtl" sx={{ mb: 4, textAlign: 'right' }}>
        سامانه جستجوی پیشرفته
      </Typography>

      <Grid container spacing={4} dir="rtl">
        
        {/* بخش فرم جستجو (بالای صفحه) */}
        <Grid item xs={12}>
            <SearchForm />
        </Grid>

        {/* بخش نتایج (پایین صفحه) */}
        <Grid item xs={12}>
          <SearchResults />
        </Grid>
        
      </Grid>
    </Container>
  );
}

export default App;