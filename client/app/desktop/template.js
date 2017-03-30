import Loader from './components/Loader'
import WebGLExperiment from './components/WebGLExperiment'
import Wrapper from './components/Wrapper'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import AssetsLoader from './../../helpers/AssetsLoader'
import Actions from './../../flux/actions'
import EventsConstants from './../../flux/constants/EventsConstants'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class AppTemplate extends React.Component {

  constructor() {

    super()
    this.initLoader()

  }

  render() {
    
    return(
      <Router>
        <Wrapper>
          <Loader />
          <ul>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/whatever">Not Found</Link>
          </ul>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/about" component={ About } />
            <Route component={ NotFound } />
          </Switch>
          <WebGLExperiment />
        </Wrapper>
      </Router>
    )

  }

  initLoader() {

    this.loader = new AssetsLoader()
    this.loader.load()

  }

}

export default AppTemplate
