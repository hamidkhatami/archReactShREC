import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '@/api/fetchDashboard';
import { DashboardResult } from '@/types/inteface';

export const useDashboardsQuery = () => {
  return useQuery<DashboardResult[]>({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime: 1000 * 60 * 5,
  });
};


