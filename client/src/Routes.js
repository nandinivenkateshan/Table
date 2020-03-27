import React from 'react'
import SignUp from './SignUp'
import Login from './Login'
import NotFound from './NotFound'
import App from './App'
import ForgotPswd from './ForgotPswd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/app' component={App} />
        <Route exact path='/pswdSet' component={ForgotPswd} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Routes
