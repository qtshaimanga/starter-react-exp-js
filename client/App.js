import './style/app.styl'
import domready from 'domready'
import GlobalManager from './helpers/GlobalManager'
import AssetsLoader from './helpers/AssetsLoader'
import Emitter from './helpers/Emitter'
import AudioManager from './helpers/AudioManager'
import { events } from './config/store'
import LoaderComponent from './components/Loader'

class App {

  constructor() {

    this.initLoader()
    this.manager = GlobalManager
    // const $root = dom.select( '.app' )

    Emitter.on( events.APP_START, () => {

      this.ambient = AudioManager.play( 'ambient-sound' )
      AudioManager.fade( 'ambient-sound', 0, 2, 1000, this.ambient )
      // AudioManager.rate( 'ambient-sound', 2, this.ambient )

    } )

  }

  initLoader() {

    this.ressources = {}

    this.loaderComponent = new LoaderComponent()

    this.loader = AssetsLoader
    this.loader
      .load()
      .then( ressources => {

        ressources.forEach( ({ id, resource }) => this.ressources[ id ] = resource )
        Emitter.emit( events.RESSOURCES_READY, this.ressources )

      } )

  }

}

domready( () => {

  new App()
  
} )

