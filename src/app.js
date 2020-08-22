import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch, useHistory } from 'react-router'
import { AuthProvider, useAuth } from './auth/store'
import { Helmet } from 'react-helmet'
import 'normalize.css'
import 'common/main.sass'

import Login from './auth/login'
import Logout from './auth/logout'

function Routes(props) {
  const authState = useAuth()
  const history = useHistory()
  let { loggedIn } = authState

  useEffect(() => {
    if(!loggedIn)
      history.push('/login')
  }, [loggedIn])

  return (
    <div>
      Show game stuff
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Helmet titleTemplate="%s - Char.sh" defaultTitle="Char.sh" />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="*" component={Routes} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}
