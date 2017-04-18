import AssetsLoader from './../../helpers/AssetsLoader'
import { BrowserRouter as Router } from 'react-router-dom'
import Actions from './../../flux/actions'
import EventsConstants from './../../flux/constants/EventsConstants'
import routes from './../../config/routes'
import Wrapper from './components/base/Wrapper'
import Menu from './components/Menu'
import Loader from './components/Loader'
import WebGLExperiment from './components/WebGLExperiment'

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
          <Menu />
          { routes }
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
