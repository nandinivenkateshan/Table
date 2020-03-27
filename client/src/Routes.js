import React from 'react'
import SignUp from './SignUp'
import Login from './Login'
import NotFound from './NotFound'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default Routes
