import { api } from "./axios";

export const TestApi = {
    saveTest: async (values: any) => {
        const res = await api.post('/test', values)
        return res.data;
    },

    getTest: async (id: string) => {
        const res = await api.get(`/test/${id}`)
        return res.data;
    },
}