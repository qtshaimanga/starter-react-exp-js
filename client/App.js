import './style/app.styl'
import domready from 'domready'
import AudioManager from './helpers/AudioManager'
import Test from './Test'

class App {

  constructor() {

    this.audioManager = new AudioManager()

    // const $root = dom.select( '.app' )

  }

}

domready( () => {

  new App()
  
} )

