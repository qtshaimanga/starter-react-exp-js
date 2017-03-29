import Store from './../../../../../flux/store'
import EventsConstants from './../../../../../flux/constants/EventsConstants'
import OrbitControls from './../../../../../utils/webgl/OrbitControls'
import Wagner from '@superguigui/wagner'
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass'
import NoisePass from '@superguigui/wagner/src/passes/noise/noise'
import BoxBlurPass from '@superguigui/wagner/src/passes/box-blur/BoxBlurPass'
import MultiPassBloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass'
import FishEyePass from '@superguigui/wagner/src/passes/fisheye/FishEyePass'

export default class Scene extends THREE.Scene {

  constructor( width, height ) {

    super()

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize( width, height )
    this.renderer.setPixelRatio( window.devicePixelRatio )

    this.renderer.setClearColor ( 0xffffff, 1 )
    this.renderer.autoClear = false
    this.renderer.gammaInput = true
    this.renderer.gammaOutput = true

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 )
    this.camera.position.set( 0, 80, 130 )
    this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) )

    this.controls = new OrbitControls( this.camera, this.renderer.domElement )
    this.controls.enabled = false

    this.postProcessing = {
      fisheye: {
        power: 0.9
      }
    }
    this.mouseDownProgress = 0

    this.bind()
    this.addListeners()
    this.initLights()
    this.initPostProcessing()

  }

  bind() {

    [ 'onMouseUp', 'onMouseDown' ]
      .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  addListeners() {

    Store.on( EventsConstants.MOUSE_UP, this.onMouseUp )
    Store.on( EventsConstants.MOUSE_DOWN, this.onMouseDown )
    
  }

  onMouseDown() {

    TweenMax.to( this, 2, { mouseDownProgress: 1, ease: Expo.easeOut, onUpdate: () => {
      
      this.mouseDownTl.progress( this.mouseDownProgress )

    } })

  }

  onMouseUp() {

    TweenMax.to( this, 0.3, { mouseDownProgress: 0, ease: Expo.easeOut, onUpdate: () => {

      this.mouseDownTl.progress( this.mouseDownProgress )

    } })

  }

  initLights() {

    this.ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1 )
    this.add( this.ambientLight )

    this.pointLight = new THREE.PointLight( 0xFFFFFF, 1 )
    this.pointLight.position.set( 150, 150, 150 )
    this.add( this.pointLight )

  }

  initPostProcessing() {

    this.composer = new Wagner.Composer( this.renderer )

    this.fxaaPass = new FXAAPass()
    this.boxBlurPass = new BoxBlurPass( 1, 1 )
    this.bloomPass = new MultiPassBloomPass({
      blurAmount: 1,
      applyZoomBlur: true
    })
    this.noisePass = new NoisePass({
      amount: 0.05,
      speed: 0
    })
    this.fishEyePass = new FishEyePass({
      power: this.postProcessing.fisheye.power
    })

    this.mouseDownTl = new TimelineMax({ paused: true })
    this.mouseDownTl
      .fromTo( this.postProcessing.fisheye, 1, { power: 1 }, { power: 0.8 }, 0 )
      .to( this.camera.position, 1, { y: 50 }, 0 )
      .to( this.camera.position, 1, { z: 100 }, 0 )

  }

  resize( newWidth, newHeight ) {

    this.camera.aspect = newWidth / newHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize( newWidth, newHeight )
    this.composer.setSize( newWidth, newHeight )

  }

  render() {

    this.composer.reset()
    this.composer.render( this, this.camera )
    this.composer.pass( this.fxaaPass )
    this.composer.pass( this.boxBlurPass )
    this.composer.pass( this.bloomPass )
    this.composer.pass( this.fishEyePass )
    this.composer.pass( this.noisePass )
    this.composer.toScreen()

  }

}