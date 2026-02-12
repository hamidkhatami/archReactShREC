import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PersistResponse, ServerErrorResponse } from '@/types/inteface';

export const useFreeSetting = () => {
    return useMutation<
        PersistResponse,
        AxiosError<ServerErrorResponse>,
        { userName: string, password: string }
    >({
        mutationFn: fetchLogin,
    });
};
