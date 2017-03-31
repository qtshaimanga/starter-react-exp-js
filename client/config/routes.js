import Home from './../app/desktop/components/Home'
import About from './../app/desktop/components/About'
import NotFound from './../app/desktop/components/NotFound'
import { Route, Switch } from 'react-router-dom'


export default (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/about" component={ About } />
    <Route component={ NotFound } />
  </Switch>
);
