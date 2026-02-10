import { create } from 'zustand'
import { toast } from 'sonner'
import { persist } from "zustand/middleware";
import { authService } from '@/services/authService'
import type { AuthState, LoginPayload, RegisterPayload } from '@/types/auth'
import { useChatStore } from './useChatStore';
import type { User } from '@/types/store';

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,
            loading: false,

            clearState: () => {
                set({ user: null, accessToken: null, loading: false })
                useChatStore.getState().reset();
                localStorage.clear();
                sessionStorage.clear();
            },
            setAccessToken: (accessToken: string) => {
                set({ accessToken });
            },
            setUser: (user: User) => {
                set({ user });
            },
            signUp: async (data: RegisterPayload) => {
                try {
                    set({ loading: true })
                    await authService.register(data)
                    toast.success('Account created successfully!')
                } catch (error) {
                    console.error(error)
                    toast.error('Failed to create account!')
                } finally {
                    set({ loading: false })
                }
            },
            signIn: async (data: LoginPayload) => {
                try {
                    get().clearState();
                    set({ loading: true })
                    const { accessToken } = await authService.login(data)
                    get().setAccessToken(accessToken)
                    await get().fetchMe()
                    useChatStore.getState().fetchConversations()
                    toast.success('Login successful!')
                } catch (error) {
                    console.error(error)
                    toast.error('Login failed!')
                } finally {
                    set({ loading: false })
                }
            },
            logout: async () => {
                try {
                    set({ loading: true })
                    get().clearState()
                    await authService.logout()
                    toast.success('Logout successful!')
                } catch (error) {
                    console.error(error)
                    toast.error('Logout failed!')
                } finally {
                    set({ loading: false })
                }
            },
            fetchMe: async () => {
                try {
                    set({ loading: true })
                    const user = await authService.fetchMe()
                    set({ user })
                    return user
                } catch (error) {
                    console.error(error)
                    set({ user: null, accessToken: null })
                    toast.error('An error occurred while fetching user data')
                } finally {
                    set({ loading: false })
                }
            },
            refresh: async () => {
                try {
                    set({ loading: true })
                    const accessToken = await authService.refresh()
                    const { user, fetchMe, setAccessToken } = get();
                    setAccessToken(accessToken)
                    if (!user) {
                        await fetchMe();
                    }
                } catch (error) {
                    console.error(error)
                    get().clearState()
                } finally {
                    set({ loading: false })
                }
            }
        }),
        {
            name: "auth-store",
            partialize: (state) => ({ user: state.user })
        }
    )
)