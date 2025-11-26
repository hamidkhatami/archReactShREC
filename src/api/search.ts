// src/api/search.ts (Updated)

import { Value } from 'react-multi-date-picker';

// تعریف تایپ کامل داده‌های ما
export interface SearchResult {
  id: number;
  name: string;
  username: string;
  department: 'IT' | 'HR' | 'Finance' | 'Marketing';
  userType: 'User' | 'Admin'; 
  joinDate: string; // تاریخ استخدام شمسی
}

// داده‌های ساختگی (Mock Data)
const mockData: SearchResult[] = [
    { id: 1, name: 'علی حسینی', username: 'ali.h', department: 'IT', userType: 'Admin', joinDate: '1402/05/10' },
    { id: 2, name: 'فاطمه محمدی', username: 'fateme.m', department: 'HR', userType: 'User', joinDate: '1403/01/01' },
    { id: 3, name: 'رضا کمالی', username: 'reza.k', department: 'Finance', userType: 'User', joinDate: '1402/11/20' },
    { id: 4, name: 'سارا احمدی', username: 'sara.a', department: 'IT', userType: 'User', joinDate: '1403/02/15' },
    { id: 5, name: 'محمد نوری', username: 'mohammad.n', department: 'IT', userType: 'Admin', joinDate: '1402/08/01' },
    { id: 6, name: 'مریم رضایی', username: 'maryam.r', department: 'Marketing', userType: 'User', joinDate: '1403/05/01' },
    { id: 7, name: 'جواد علوی', username: 'javad.a', department: 'Finance', userType: 'Admin', joinDate: '1402/01/01' },
];

interface SearchParams {
    term: string;
    type: 'User' | 'Admin' | 'All';
    department: string;
    startDate: Value; 
}

export async function fetchSearchResults(params: SearchParams): Promise<SearchResult[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // شبیه‌سازی تأخیر شبکه

    let results = mockData;

    // فیلتر جستجوی متنی
    if (params.term) {
        const lowerTerm = params.term.toLowerCase();
        results = results.filter(user =>
            user.name.toLowerCase().includes(lowerTerm) ||
            user.username.toLowerCase().includes(lowerTerm)
        );
    }

    // فیلتر رادیو باتن (نوع کاربر)
    if (params.type !== 'All') {
        results = results.filter(user => user.userType === params.type);
    }

    // فیلتر کمبو باکس (دپارتمان)
    if (params.department) {
        results = results.filter(user => user.department === params.department);
    }
    
    // فیلتر تاریخ (برای مثال: فقط نتایجی که تاریخ استخدامشان بعد از تاریخ ورودی است)
    if (params.startDate) {
        // در یک برنامه واقعی، باید تاریخ‌ها را به فرمت قابل مقایسه (مثل میلادی) تبدیل کرد.
        // اینجا فقط برای سادگی، این فیلتر را شبیه‌سازی نمی‌کنیم اما پارامترش در دسترس است.
    }

    return results;
}