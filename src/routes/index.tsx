import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from 'src/pages/Home'
import Filmes from 'src/pages/Filmes'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/filmes" component={Filmes} />
  </Switch>
)

export default Routes
