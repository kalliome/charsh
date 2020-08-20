import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './auth/authContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/login" component={Login} />
      </Router>
    </AuthProvider>
  )
}

export default App
