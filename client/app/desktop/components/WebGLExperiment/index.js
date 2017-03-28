import loop from 'raf-loop'
import stats from 'stats.js'
import GlobalManager from './../../../../helpers/GlobalManager'
import Emitter from './../../../../helpers/Emitter'
import AudioManager from './../../../../helpers/AudioManager'
import { events } from './../../../../config/store'
import Scene from './core/Scene'
import Icosahedron from './objects/Icosahedron'
import PolarBear from './objects/PolarBear'

class WebGLExperiment extends React.Component {

  constructor( props ) {

    super()
    
    this.resources = props.resources
    this.manager = GlobalManager

    this.DELTA_TIME = 0
    this.CURRENT_TIME = 0

  }

  render() {

    return(
      <div className="canvas-container" ref="parent"></div>
    )

  }

  componentDidMount() {

    this.scene = new Scene( this.manager.windowSize.w, this.manager.windowSize.h )
    this.refs.parent.appendChild( this.scene.renderer.domElement )

    Emitter.on( events.APP_START, () => {

      this.ambient = AudioManager.play( 'ambient-sound' )
      AudioManager.fade( 'ambient-sound', 0, 2, 1000, this.ambient )
      this.start()

    } )

  }

  start() {

    this.clock = new THREE.Clock()

    this.stats = new stats()
    this.refs.parent.appendChild( this.stats.dom )

    this.Icosahedron = new Icosahedron()
    this.scene.add( this.Icosahedron )

    this.polarBear = new PolarBear( this.resources[ 'polar-bear' ] )
    this.scene.add( this.polarBear )

    this.bind()
    this.addListeners()

    this.loop = loop( this.update )
    this.loop.start()

  }

  bind() {

    [ 'resize', 'update' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  addListeners() {

    Emitter.on( events.WINDOW_RESIZE, this.resize )

  }

  resize() {

    this.scene.resize( this.manager.windowSize.w, this.manager.windowSize.h )

  }

  update() {

    this.stats.begin()

    this.DELTA_TIME = this.clock.getDelta()
    this.CURRENT_TIME = this.clock.getElapsedTime()

    this.scene.render()

    this.stats.end()


  }

}

export default WebGLExperiment
