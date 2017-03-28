import Loader from './components/Loader/Loader'
import AssetsLoader from './../../helpers/AssetsLoader'
import Emitter from './../../helpers/Emitter'
import { events } from './../../config/store'

export default class AppTemplate extends React.Component {

  constructor() {
    
    super()
    this.initLoader()

  }

  render() {

    return(
      <div className="main">
        <Loader />
      </div>
    )

  }

  initLoader() {

    this.ressources = {}

    this.loader = new AssetsLoader()
    this.loader
      .load()
      .then( ressources => {

        ressources.forEach( ({ id, resource }) => this.ressources[ id ] = resource )
        Emitter.emit( events.RESSOURCES_READY, this.ressources )

      } )

  }

}