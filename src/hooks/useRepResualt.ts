import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { persistProcessDate } from '@/api/persistProcessDate';
import { FeeSetting, PersistResponse, ServerErrorResponse } from '@/types/inteface';

export const useRepResult = () => {
  return useMutation<
    PersistResponse,
    AxiosError<ServerErrorResponse>,
    { setting: FeeSetting }
  >({
    mutationFn: persistProcessDate,
  });
};
