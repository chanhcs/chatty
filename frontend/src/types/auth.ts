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
    user: null | Record<string, unknown>
    accessToken: string | null
    loading: boolean
    clearState: () => void
    signUp: (data: RegisterPayload) => Promise<void>
    signIn: (data: LoginPayload) => Promise<void>
    logout: () => Promise<void>
}