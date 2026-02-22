import { api } from '@/lib/api'

export interface AuthUser {
  id: string
  email: string
  name?: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface SignupPayload {
  email: string
  password: string
  name?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  return api.post<AuthResponse>('/auth/signup', payload)
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return api.post<AuthResponse>('/auth/login', payload)
}

export interface SsoStartResponse {
  url: string
}

export async function startSso(provider: 'google' | 'github'): Promise<string> {
  const res = await api.post<SsoStartResponse>('/auth/sso/start', { provider })
  return res.url
}
