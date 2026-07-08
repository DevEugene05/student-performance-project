import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simple validation - in production, validate against backend
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    if (!email.includes('@')) {
      throw new Error('Please enter a valid email')
    }

    // Create user object
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      loginTime: new Date().toISOString(),
    }

    // Store in localStorage and state
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const register = (email, password, confirmPassword) => {
    // Validation
    if (!email || !password || !confirmPassword) {
      throw new Error('All fields are required')
    }

    if (!email.includes('@')) {
      throw new Error('Please enter a valid email')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // For demo purposes, just do login
    return login(email, password)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
