import Actions from './actions'
import DeviceConstants from './constants/DeviceConstants'
import EventsConstants from './constants/EventsConstants'
import MobileDetect from 'mobile-detect'
import getContext from 'get-canvas-context'


const md = new MobileDetect( window.navigator.userAgent )
const testCanvas = document.createElement( 'canvas' )

const onWindowResize = () => {

  _windowSize.w = window.innerWidth
  _windowSize.h = window.innerHeight
  _device = ( this.windowSize.w > this.windowSize.h ) ? DeviceConstants.LANDSCAPE : DeviceConstants.PORTRAIT
  Actions.onWindowResize( _windowSize.w, _windowSize.h )

}

const onMouseMove = ( e ) => {

  e.preventDefault()
  _mouse.x  = e.clientX || _mouse.x
  _mouse.y  = e.clientY || _mouse.y
  _mouse.nX = ( _mouse.x / _windowSize.w ) * 2 - 1
  _mouse.nY = ( _mouse.y / _windowSize.h ) * 2 + 1
  Actions.onMouseMove( _mouse )

}

const onMouseUp = () => {

  Actions.onMouseUp()

}

const onMouseDown = () => {

  Actions.onMouseDown()

}

const onWindowBlur = () => {

  Actions.onWindowBlur()

}

const onWindowFocus = () => {

  Actions.onWindowFocus()

}

const checkDevice = () => {

  _device.mobile = ( md.mobile() || md.tablet() ) ? true : false
  _device.supportWebGL = getContext( 'webgl', { canvas: testCanvas } ) ? true : false

}

dom.event.on( window, 'resize', onWindowResize )
dom.event.on( window, 'mousemove', onMouseMove )
dom.event.on( window, 'mouseup', onMouseUp )
dom.event.on( window, 'mousedown', onMouseDown )
dom.event.on( window, 'blur', onWindowBlur )
dom.event.on( window, 'focus', onWindowFocus )
