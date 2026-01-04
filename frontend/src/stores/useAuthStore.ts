import { create } from 'zustand'
import { toast } from 'sonner'
import { authServices } from '@/services/authServices'
import type { AuthState, LoginPayload, RegisterPayload } from '@/types/auth'

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    accessToken: null,
    loading: false,

    clearState: () => {
        set({user: null, accessToken: null, loading: false})
    },
    signUp: async (data: RegisterPayload) => {
        try {
            set({ loading: true })
            await authServices.register(data)
            toast.success('Account created successfully!')
        } catch (error) {
            console.error(error)
            toast.error('Failed to create account!')
        } finally {
            set({ loading: false })
        }
    },
    signIn: async(data: LoginPayload) => {
        try {
            set({ loading: true })
            const { accessToken } = await authServices.login(data)
            set({ accessToken })
            toast.success('Login successful!')
        } catch (error) {
            console.error(error)
            toast.error('Login failed!')
        }
    },
    logout: async() => {
        try {
            get().clearState()
            await authServices.logout()
            toast.success('Logout successful!')
        } catch (error) {
            console.error(error)
            toast.error('Logout failed!')
        }
    }
}))