import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('tastyhub_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('tastyhub_user', JSON.stringify(userData))
  }

  const register = (userData) => {
    setUser(userData)
    localStorage.setItem('tastyhub_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tastyhub_user')
    navigate('/')
  }

  const updateFavorites = (favorites) => {
    const updatedUser = { ...user, favorites }
    setUser(updatedUser)
    localStorage.setItem('tastyhub_user', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}