// src/api/dahsboard.ts
import { getAxios } from '@/services/http';
import { DashboardResponse, DashboardResult } from '@/types/inteface';


export async function fetchDashboard(): Promise<DashboardResult[]> {
const axios=getAxios();

  const response = await axios.get<DashboardResponse>('/files');
  return response.data.PROCESS_RESULT;
}