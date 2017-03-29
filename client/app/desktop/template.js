// import Loader from './components/Loader'
// import WebGLExperiment from './components/WebGLExperiment'
// import AssetsLoader from './../../helpers/AssetsLoader'
import Store from './../../flux/store/'
import EventsConstants from './../../flux/constants/EventsConstants'

export default class AppTemplate extends React.Component {

  constructor() {

    super()
    this.resources = {}
    
    console.log( Store.Mouse )
    Store.on( EventsConstants.MOUSE_MOVE, ( mouse ) => {

      console.log( mouse )

    } )
    // this.initLoader()

  }

  render() {

    return(
      <div className="main">
        {/*<Loader />
        <WebGLExperiment resources={ this.resources }/>*/}
      </div>
    )

  }

  initLoader() {

    // this.loader = new AssetsLoader()
    // this.loader
    //   .load()
    //   .then( resources => {

    //     resources.forEach( ({ id, resource }) => this.resources[ id ] = resource )
    //     Emitter.emit( events.RESOURCES_READY, this.resources )

    //   } )

  }

}
