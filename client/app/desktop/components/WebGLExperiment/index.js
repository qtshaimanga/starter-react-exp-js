import loop from 'raf-loop'
import stats from 'stats.js'
import Store from './../../../../flux/store'
import AudioManager from './../../../../helpers/AudioManager'
import EventsConstants from './../../../../flux/constants/EventsConstants'
import Scene from './core/Scene'
import Icosahedron from './objects/Icosahedron'
import PolarBear from './objects/PolarBear'

class WebGLExperiment extends React.Component {

  constructor( props ) {

    super()
    
    this.resources = props.resources

    this.DELTA_TIME = 0
    this.CURRENT_TIME = 0

  }

  render() {

    return(
      <div className="canvas-container" ref="parent"></div>
    )

  }

  componentDidMount() {

    this.scene = new Scene( Store.Size.w, Store.Size.h )
    this.refs.parent.appendChild( this.scene.renderer.domElement )

    Store.on( EventsConstants.APP_START, () => {

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

    this.polarBear = new PolarBear()
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

    Store.on( EventsConstants.WINDOW_RESIZE, this.resize )

  }

  resize() {

    this.scene.resize( Store.Size.w, Store.Size.h )

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
