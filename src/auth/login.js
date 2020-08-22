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
    if(loggedIn)
      history.push('/')

  }, [loggedIn])

  const onLoginSubmit = async values => {
    let res = await api.post('/api/login', values)
     
    if(res.token)
      setToken(res.token)

    return res
  }

  const validation = {
    username: ['required'],
    password: ['required']
  }

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <h1>Login</h1>
        <Form validation={validation} onSubmit={onLoginSubmit}>
          <Field type="text" name="username" placeholder="Username" />
          <Field type="password" name="password" placeholder="Password" />
          <Submit text="Login" icon="sign-in-alt" />
        </Form>
      </div>
    </div>
  )
}