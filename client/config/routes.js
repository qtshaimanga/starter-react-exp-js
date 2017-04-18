import Home from './../app/desktop/components/pages/Home'
import About from './../app/desktop/components/pages/About'
import NotFound from './../app/desktop/components/pages/NotFound'
import { Route, Switch } from 'react-router-dom'


export default (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/about" component={ About } />
    <Route component={ NotFound } />
  </Switch>
)
