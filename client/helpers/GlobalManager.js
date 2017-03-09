import { events, device } from '../config/store'
import Emitter from './Emitter'

class GlobalManager {

  constructor() {

    this.windowSize = { w: window.innerWidth, h: window.innerHeight }
    this.mouse = { x: 0, y: 0, nX: 0, nY: 0 }

    this.bind()
    this.addListeners()
    this.onWindowResize()

  }

  bind() {

    [ 'onWindowResize', 'onMouseMove', 'onWindowBlur', 'onWindowFocus' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  addListeners() {

    dom.event.on( window, 'resize', this.onWindowResize )
    dom.event.on( window, 'mousemove', this.onMouseMove )
    dom.event.on( window, 'blur', this.onWindowBlur )
    dom.event.on( window, 'focus', this.onWindowFocus )

  }

  onWindowResize() {

    this.windowSize.w = window.innerWidth
    this.windowSize.h = window.innerHeight
    this.orientation = ( this.windowSize.w > this.windowSize.h ) ? device.LANDSCAPE : device.PORTRAIT

    Emitter.emit( events.WINDOW_ON_RESIZE, this.windowSize )

  }

  onMouseMove(e) {

    e.preventDefault()

    this.mouse.x  = e.clientX || this.mouse.x
    this.mouse.y  = e.clientY || this.mouse.y
    this.mouse.nX = (this.mouse.x / this.windowSize.w) * 2 - 1
    this.mouse.nY = (this.mouse.y / this.windowSize.h) * 2 + 1

    Emitter.emit( events.MOUSE_MOVE, this.mouse )

  }

  onWindowBlur() {

    Emitter.emit( events.WINDOW_ON_BLUR )

  }

  onWindowFocus() {

    Emitter.emit( events.WINDOW_ON_FOCUS )

  }

}

export default new GlobalManager