// AuthContext.js
import { createContext, useContext, useReducer } from 'react'
import authReducer from './authReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [state, dispatchAuth] = useReducer(authReducer, { user: null })

  return (
    <AuthContext.Provider value={{ state, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
