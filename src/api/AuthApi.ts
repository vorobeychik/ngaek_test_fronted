import { api } from "./axios";

export const AuthApi = {
    registration: async (values: any) => {
        const res = await api.post('/auth/register', values)
        return res.data;
    },
    login: async (values: any) => {
        const res = await api.post('/auth/login', values)
        return res.data;
    },
    auth: async (token: string) => {
        const res = await api.post('/auth', { token })
        return res.data;
    }
}