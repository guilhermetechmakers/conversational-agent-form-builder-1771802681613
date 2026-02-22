import * as React from 'react'

interface User {
  id: string
  email: string
  name?: string
}

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      // TODO: Validate token and fetch user
      setUser({ id: '1', email: 'user@example.com', name: 'User' })
    }
    setIsLoading(false)
  }, [])

  const login = React.useCallback(async (email: string, _password: string) => {
    setUser({ id: '1', email, name: 'User' })
    localStorage.setItem('auth_token', 'mock-token')
  }, [])

  const signup = React.useCallback(async (email: string, _password: string, name?: string) => {
    setUser({ id: '1', email, name })
    localStorage.setItem('auth_token', 'mock-token')
  }, [])

  const logout = React.useCallback(() => {
    setUser(null)
    localStorage.removeItem('auth_token')
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
