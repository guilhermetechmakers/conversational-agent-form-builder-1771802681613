import * as React from 'react'
import { signup as apiSignup, login as apiLogin, type AuthUser } from '@/api/auth'

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Stub: In production, validate token and fetch user from API
      const stored = localStorage.getItem('auth_user')
      if (stored) {
        try {
          setUser(JSON.parse(stored))
        } catch {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
        }
      }
    }
    setIsLoading(false)
  }, [])

  const login = React.useCallback(async (email: string, password: string) => {
    const res = await apiLogin({ email, password })
    localStorage.setItem('auth_token', res.token)
    localStorage.setItem('auth_user', JSON.stringify(res.user))
    setUser(res.user)
  }, [])

  const signup = React.useCallback(async (email: string, password: string, name?: string) => {
    const res = await apiSignup({ email, password, name })
    localStorage.setItem('auth_token', res.token)
    localStorage.setItem('auth_user', JSON.stringify(res.user))
    setUser(res.user)
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }, [])

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
