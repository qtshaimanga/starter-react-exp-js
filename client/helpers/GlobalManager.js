import { events, device } from '../config/store'
import Emitter from './Emitter'
import MobileDetect from 'mobile-detect'
import getContext from 'get-canvas-context'

const testCanvas = document.createElement('canvas')
const md = new MobileDetect(window.navigator.userAgent)

class GlobalManager {

  constructor() {

    this.windowSize = { w: window.innerWidth, h: window.innerHeight }
    this.device = { mobile: false, supportWebGL: false }
    this.mouse = { x: 0, y: 0, nX: 0, nY: 0 }

    this.bind()
    this.addListeners()
    this.checkDevice()
    this.onWindowResize()

  }

  bind() {

    [ 'onWindowResize', 'onMouseMove', 'onMouseUp', 'onMouseDown', 'onWindowBlur', 'onWindowFocus' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  addListeners() {

    dom.event.on( window, 'resize', this.onWindowResize )
    dom.event.on( window, 'mousemove', this.onMouseMove )
    dom.event.on( window, 'mouseup', this.onMouseUp )
    dom.event.on( window, 'mousedown', this.onMouseDown )
    dom.event.on( window, 'blur', this.onWindowBlur )
    dom.event.on( window, 'focus', this.onWindowFocus )

  }

  onWindowResize() {

    this.windowSize.w = window.innerWidth
    this.windowSize.h = window.innerHeight
    this.orientation = ( this.windowSize.w > this.windowSize.h ) ? device.LANDSCAPE : device.PORTRAIT

    Emitter.emit( events.WINDOW_RESIZE, this.windowSize )

  }

  onMouseMove( e ) {

    e.preventDefault()

    this.mouse.x  = e.clientX || this.mouse.x
    this.mouse.y  = e.clientY || this.mouse.y
    this.mouse.nX = (this.mouse.x / this.windowSize.w) * 2 - 1
    this.mouse.nY = (this.mouse.y / this.windowSize.h) * 2 + 1

    Emitter.emit( events.MOUSE_MOVE, this.mouse )

  }

  onMouseUp() {

    Emitter.emit( events.MOUSE_UP )

  }

  onMouseDown() {

    Emitter.emit( events.MOUSE_DOWN )

  }

  onWindowBlur() {

    Emitter.emit( events.WINDOW_ON_BLUR )

  }

  onWindowFocus() {

    Emitter.emit( events.WINDOW_ON_FOCUS )

  }

  checkDevice() {

    this.device.mobile = ( md.mobile() || md.tablet() ) ? true : false
    this.device.supportWebGL = getContext( 'webgl', { canvas: testCanvas } ) ? true : false

  }

}

export default new GlobalManager