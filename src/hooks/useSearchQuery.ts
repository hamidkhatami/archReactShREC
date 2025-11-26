// src/hooks/useSearchQuery.ts (Updated)

import { useQuery } from '@tanstack/react-query';
import { fetchSearchResults, SearchResult } from '../api/search';
import { useSearchStore } from '../store/searchStore';
import { DateObject } from 'react-multi-date-picker';

export const useSearchQuery = () => {
  const { submitTerm, submitFilters } = useSearchStore();

  // اگر حداقل یکی از فیلترها مقدار داشته باشد، کوئری فعال می‌شود
  const isEnabled = !!submitTerm || submitFilters.searchType !== 'All' || !!submitFilters.department || !!submitFilters.startDate;

  return useQuery<SearchResult[]>({
    // کلید کوئری باید تمام پارامترهای موثر در نتیجه را شامل شود (برای کش کردن مجزا)
    queryKey: ['search', submitTerm, submitFilters.searchType, submitFilters.department, submitFilters.startDate?.toString()], 
    
    queryFn: () => fetchSearchResults({
        term: submitTerm,
        // این مقادیر از submitFilters به تابع fetchSearchResults پاس داده می‌شوند
        type: submitFilters.searchType as ('User' | 'Admin' | 'All'), 
        department: submitFilters.department,
        startDate: submitFilters.startDate,
    }),
    
    // اجرای کوئری فقط در صورت فعال بودن فیلتر
    enabled: isEnabled, 
    
    staleTime: 1000 * 60 * 5, 
  });
};