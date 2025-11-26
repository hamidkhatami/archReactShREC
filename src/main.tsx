// src/main.tsx

import React from 'react';
import * as ReactDOM from 'react-dom/client'; // ایمپورت صحیح ReactDOM برای createRoot
import App from './App.tsx';

// --- ۱. ایمپورت‌ها برای React Query و MUI/RTL ---
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// --- ۲. تعریف متغیرها: تنظیمات RTL و تم ---

// الف) ساختن کش راست‌چین (Cache RTL)
const cacheRtl = createCache({
  key: 'muirtl', 
  stylisPlugins: [prefixer, rtlPlugin], // این پلاگین استایل‌ها را قرینه می‌کند
});

// ب) ساختن تم MUI با جهت RTL
const theme = createTheme({
  direction: 'rtl', // کلید اصلی برای فعالسازی RTL
  typography: {
    fontFamily: 'IRANSans, Vazirmatn, Arial', // فونت فارسی دلخواه شما
  },
  // ... سایر تنظیمات تم
});

// ج) ساخت Client برای React Query
const queryClient = new QueryClient(); 

// --- ۳. رندر کردن اپلیکیشن با Providerها ---
const container = document.getElementById('root');
// ⚠️ اینجا متغیر ReactDOM باید از قبل ایمپورت شده باشد (گام ۱)
const root = ReactDOM.createRoot(container!); 

root.render(
  <React.StrictMode>
    {/* ۱. QueryClientProvider: برای مدیریت وضعیت سرور (کش، لودینگ و...) */}
    <QueryClientProvider client={queryClient}> 
      {/* ۲. CacheProvider: برای فعالسازی RTL در سطح Emotion/Stylis */}
      <CacheProvider value={cacheRtl}>
        {/* ۳. ThemeProvider: برای اعمال تم و جهت RTL در سطح MUI */}
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);