import { instance } from '../../core/axios';
import { LoginData } from './types';

export const authApi = {
    async login(payload: { login: string; password: string }): Promise<LoginData> {
        const { login, password } = payload;

        const { data } = await instance.post('/', {
            action: 'login',
            login,
            password,
        });

        return data;
    },
};
