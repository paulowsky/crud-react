import React from 'react'
import { Switch, Route } from 'react-router-dom'

import DashboardMovies from 'src/pages/Dashboard/DashboardMovies'
import PrivateRoute from './PrivateRoute'
import Login from 'src/pages/Login'
import Home from 'src/pages/Home'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <PrivateRoute path="/dashboard/movies" exact component={DashboardMovies} />
  </Switch>
)

export default Routes
