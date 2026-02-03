import api from "@/lib/axios";
import type { LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
    register: async (data: RegisterPayload) => {
        const res = await api.post('/auth/register', data)
        return res.data
    },
    login: async(data: LoginPayload) => {
        const res = await api.post('/auth/login', data)
        return res.data
    },
    logout: async() => {
        const res = await api.post('/auth/logout')
        return res
    },
    fetchMe: async() => {
        const res = await api.get('/users/me')
        return res.data.user
    },
    refresh: async() => {
        const res = await api.post('/auth/refresh')
        return res.data.accessToken
    }
}