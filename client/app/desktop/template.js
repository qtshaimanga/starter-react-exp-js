import Loader from './components/Loader'
import WebGLExperiment from './components/WebGLExperiment'
import Intro from './components/Intro'
import Indochine from './components/Indochine'
import AssetsLoader from './../../helpers/AssetsLoader'
import Actions from './../../flux/actions'
import EventsConstants from './../../flux/constants/EventsConstants'
import { Router, Route, Link } from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'

const history = createHashHistory({ queryKey: false });


class AppTemplate extends React.Component {

  constructor() {

    super()

    this.initLoader()

    history.listen( location => { 
      
      console.log(location)

    });

  }

  render() {

    return(
      <div className="main">
        <Loader />
        <Router history={history}>
          <div className="container">
            <ul>
              <li><Link to="/">Intro</Link></li>
              <li><Link to="/indochine">Indochine</Link></li>
            </ul>
            <Route exact path="/" component={ Intro } />
            <Route path="/indochine" component={ Indochine } />
          </div>
        </Router>
        <WebGLExperiment />
      </div>
    )

  }

  initLoader() {

    this.loader = new AssetsLoader()
    this.loader.load()

  }

}

export default AppTemplate
