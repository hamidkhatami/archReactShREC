// src/store/searchStore.ts

import { create } from 'zustand';
import { Value } from 'react-multi-date-picker'; 

type UserType = 'User' | 'Admin' | 'All'; 

interface SearchState {
  // --- فیلدهای فرم (لحظه‌ای) ---
  searchTerm: string;
  searchType: UserType;
  department: string;
  startDate: Value; // تاریخ شمسی انتخاب شده

  // --- فیلدهای سابمیت شده (برای React Query) ---
  submitTerm: string;
  submitFilters: Omit<SearchState, 'searchTerm' | 'submitTerm' | 'submitFilters' | 
    'setSearchTerm' | 'setSearchType' | 'setDepartment' | 'setStartDate' | 'submitAll'>;

  // --- Actions ---
  setSearchTerm: (term: string) => void;
  setSearchType: (type: UserType) => void;
  setDepartment: (dept: string) => void;
  setStartDate: (date: Value) => void;
  submitAll: () => void; // اکشن نهایی سابمیت
}

export const useSearchStore = create<SearchState>((set, get) => ({
  // مقادیر اولیه
  searchTerm: '', 
  searchType: 'All', // پیش‌فرض رادیو باتن
  department: '', // پیش‌فرض کمبو باکس
  startDate: null, 
  
  submitTerm: '',
  submitFilters: { searchType: 'All', department: '', startDate: null },
  
  // تعریف توابع Setter
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchType: (type) => set({ searchType: type }),
  setDepartment: (dept) => set({ department: dept }),
  setStartDate: (date) => set({ startDate: date }),
  
  // اکشن سابمیت: وضعیت لحظه‌ای فرم را به وضعیت نهایی کوئری منتقل می‌کند
  submitAll: () => {
    const currentState = get();
    alert( currentState.startDate)
    set({
      submitTerm: currentState.searchTerm,
      submitFilters: {
        searchType: currentState.searchType,
        department: currentState.department,
        startDate: currentState.startDate,
      },
    });
  },
}));