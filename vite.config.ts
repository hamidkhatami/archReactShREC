import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // برای تنظیم Path Aliases باید پکیج path را ایمپورت کنیم

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- ۱. تنظیم مسیرهای مستعار (Path Aliases) ---
  resolve: {
    alias: {
      // '@' را به پوشه src/ نگاشت می‌کند. 
      // مثال: import X from '@/components/X'
      '@': path.resolve(__dirname, './src'), 
    },
  },

  // --- ۲. تنظیمات Vitest ---
  test: {
    globals: true, // استفاده از توابع تست به صورت سراسری (مثل describe, it)
    environment: 'jsdom', // شبیه‌سازی محیط مرورگر برای تست کامپوننت‌های ریکت
    setupFiles: './src/setupTests.ts', 
    // 
    // این خط برای تست کامپوننت‌های MUI که از CSS-in-JS استفاده می‌کنند، بسیار مفید است
    css: true, 
  },
});