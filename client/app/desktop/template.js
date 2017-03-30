import Loader from './components/Loader'
import WebGLExperiment from './components/WebGLExperiment'
import Wrapper from './components/Wrapper'
import Intro from './components/Intro'
import Indochine from './components/Indochine'
import AssetsLoader from './../../helpers/AssetsLoader'
import Actions from './../../flux/actions'
import EventsConstants from './../../flux/constants/EventsConstants'
import { Router, Route, Link } from 'react-router-dom'

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
            <Link to="/indochine">Indochine</Link>
          </ul>
          <Route exact path="/" component={ Intro } />
          <Route path="/indochine" component={ Indochine } />
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
