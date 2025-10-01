'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refresh: async () => {}
})

async function handleJsonResponse (response) {
  const result = await response.json().catch(() => ({ success: false, error: 'Unbekannte Antwort.' }))
  if (!response.ok) {
    throw new Error(result.error || 'Anfrage fehlgeschlagen.')
  }
  return result
}

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include'
      })

      if (!response.ok) {
        setUser(null)
        return null
      }

      const result = await response.json()
      setUser(result.data)
      return result.data
    } catch (refreshError) {
      console.error('Auth-Status konnte nicht geladen werden:', refreshError)
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(async ({ email, password }) => {
    setError(null)
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    const result = await handleJsonResponse(response)
    setUser(result.data)
    setLoading(false)
    return result.data
  }, [])

  const register = useCallback(async ({ name, email, password, passwordConfirm }) => {
    setError(null)
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, passwordConfirm }),
      credentials: 'include'
    })

    const result = await handleJsonResponse(response)
    setUser(result.data)
    setLoading(false)
    return result.data
  }, [])

  const logout = useCallback(async () => {
    setError(null)
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    setUser(null)
  }, [])

  useEffect(() => {
    setError(null)
  }, [user])

  const value = useMemo(() => ({
    user,
    loading,
    error,
    login,
    register,
    logout,
    refresh
  }), [user, loading, error, login, register, logout, refresh])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}
