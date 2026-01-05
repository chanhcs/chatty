import type { User } from "./user"

export interface RegisterPayload {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export interface LoginPayload {
  username: string
  password: string
}



export interface AuthState {
    user: User | null
    accessToken: string | null
    loading: boolean
    clearState: () => void
    setAccessToken: (data: string) => void
    signUp: (data: RegisterPayload) => Promise<void>
    signIn: (data: LoginPayload) => Promise<void>
    logout: () => Promise<void>
    fetchMe: () => Promise<void>
    refresh: () => Promise<void>
}