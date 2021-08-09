import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'src/pages/Home'
import Movies from 'src/pages/Movies'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/movies" exact component={Movies} />
  </Switch>
)

export default Routes
