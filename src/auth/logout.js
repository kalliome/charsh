import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Field, Submit } from 'form'
import { useAuth } from './store'
import api from 'api'
import './auth.sass'

export default function Login(props) {
  const history = useHistory()
  const { setToken, loggedIn } = useAuth()

  useEffect(() => {
    delete localStorage.token
    setToken(false)
  }, [])

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <h1>You are logged out</h1>
      </div>
    </div>
  )
}