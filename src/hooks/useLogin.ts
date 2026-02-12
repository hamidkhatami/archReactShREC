import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { fetchLogin } from '@/api/fetchLogin';
import { LoginResponse, ServerErrorResponse } from '@/types/inteface';

export const useLogin = () => {
    return useMutation<
        LoginResponse,
        AxiosError<ServerErrorResponse>,
        { userName: string, password: string }
    >({
        mutationFn: fetchLogin,
    });
};
