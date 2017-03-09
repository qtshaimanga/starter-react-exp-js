import './style/app.styl'
import domready from 'domready'
import GlobalManager from './helpers/GlobalManager'
import AssetsLoader from './helpers/AssetsLoader'
import AudioManager from './helpers/AudioManager'
import Emitter from './helpers/Emitter'
import { events } from './config/store'

class App {

  constructor() {
    
    this.ressources = {}

    this.loader = AssetsLoader
    this.loader
      .load()
      .then( ressources => {

        ressources.forEach( ({ id, resource }) => this.ressources[ id ] = resource )
        Emitter.emit( events.RESSOURCES_READY, this.ressources )

      } )

    Emitter.on( events.RESSOURCES_READY, ( ressources ) => {

      console.log( 'loaded', ressources )
      AudioManager.play('ambient-sound')

    } )

    this.manager = GlobalManager
    // const $root = dom.select( '.app' )

  }

}

domready( () => {

  new App()
  
} )

