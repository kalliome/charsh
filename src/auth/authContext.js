import React, { createContext, useState, useEffect, useContext } from 'react'

const authContext = createContext()

export function useAuth() {
  return useContext(authContext)
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function useProvideAuth() {
  let [token, setToken] = useState(localStorage.token || false)
  let [user, setUser] = useState(false)

  useEffect(() => {
    console.log('Load current user')
  }, [token])

  return {
    user
  }
}