import Loader from './components/Loader'
import WebGLExperiment from './components/WebGLExperiment'
import AssetsLoader from './../../helpers/AssetsLoader'
import Actions from './../../flux/actions'
import EventsConstants from './../../flux/constants/EventsConstants'

export default class AppTemplate extends React.Component {

  constructor() {

    super()

    this.initLoader()

  }

  render() {

    return(
      <div className="main">
        <Loader />
        <WebGLExperiment />
      </div>
    )

  }

  initLoader() {

    this.loader = new AssetsLoader()
    this.loader.load()

  }

}
