import './style/app.styl'
import domready from 'domready'
import loop from 'raf-loop'
import stats from 'stats.js'
import GlobalManager from '../../helpers/GlobalManager'
import AssetsLoader from '../../helpers/AssetsLoader'
import Emitter from '../../helpers/Emitter'
import AudioManager from '../../helpers/AudioManager'
import { events } from '../../config/store'
import LoaderComponent from '../../components/Loader'
import Scene from './core/Scene'
import Icosahedron from './objects/Icosahedron'
import PolarBear from './objects/PolarBear'

class App extends React.Component {

  constructor() {

    this.manager = GlobalManager
    this.root = dom.select( '.app' )

    this.DELTA_TIME = 0
    this.CURRENT_TIME = 0


    this.initLoader()

    this.scene = new Scene( this.manager.windowSize.w, this.manager.windowSize.h )
    this.root.appendChild( this.scene.renderer.domElement )

    Emitter.on( events.APP_START, () => {

      this.ambient = AudioManager.play( 'ambient-sound' )
      AudioManager.fade( 'ambient-sound', 0, 2, 1000, this.ambient )
      this.start()

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

  start() {

    this.clock = new THREE.Clock()

    this.stats = new stats()
    this.root.appendChild( this.stats.dom )

    this.Icosahedron = new Icosahedron()
    this.scene.add( this.Icosahedron )

    this.polarBear = new PolarBear( this.ressources[ 'polar-bear' ] )
    this.scene.add( this.polarBear )

    this.bind()
    this.addListeners()

    this.loop = loop( this.render )
    this.loop.start()

  }

  bind() {

    [ 'resize', 'render' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  addListeners() {

    Emitter.on( events.WINDOW_RESIZE, this.resize )

  }

  resize() {

    this.scene.resize( this.manager.windowSize.w, this.manager.windowSize.h )

  }

  render() {

    this.stats.begin()

    this.DELTA_TIME = this.clock.getDelta()
    this.CURRENT_TIME = this.clock.getElapsedTime()

    this.scene.render()

    this.stats.end()


  }

}

export default App;


// domready( () => {
//
//   new App()
//
// } )
