import React, { createContext, useState, useEffect, useContext } from 'react'
import api from 'api'

const authContext = createContext()

export function useAuth() {
  return useContext(authContext)
}

export function AuthProvider({ children }) {
  
  let [token, setToken] = useState(localStorage.token || false)
  let [user, setUser] = useState({})
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    let authProvider = Promise.resolve({
      token: false,
      user: {}
    })

    if(token) {
      localStorage.token = token
      authProvider = api.get('/api/user')
      .then(({user}) => {
        return {
          token,
          user
        }
      })
    } else {
      delete localStorage.token
    }

    authProvider.then(({token, user}) => {
      setToken(token)
      setUser(user)
      setLoading(false)
    })

  }, [token])

  if(loading)
    return (
      <div className="auth-loading">
        Show auth loading
      </div>
    )

  const value = {
    user,
    setToken,
    loggedIn: !!token
  }

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}