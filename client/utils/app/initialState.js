import Actions from './../flux/actions/'


class InitialState {

  constructor(){

    this.bind()
    this.addListeners()

  }

  bind() {

    [ 'onWindowResize',
      'onMouseMove', 
      'onMouseUp', 
      'onMouseDown', 
      'onWindowBlur', 
      'onWindowFocus'
    ].forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  addListeners() {

    dom.event.on( window, 'resize', this.onWindowResize )
    dom.event.on( window, 'mousemove', this.onMouseMove )
    dom.event.on( window, 'mouseup', this.onMouseUp )
    dom.event.on( window, 'mousedown', this.onMouseDown )
    dom.event.on( window, 'blur', this.onWindowBlur )
    dom.event.on( window, 'focus', this.onWindowFocus )

  }

  onWindowResize = () => {

    Actions.onWindowResize( window.innerWidth, window.innerHeight )

  }

  onMouseMove = ( e ) => {

    e.preventDefault()
    const _mouse = { x: 0, y: 0, nX: 0, nY: 0 }

    _mouse.x  = e.clientX || _mouse.x
    _mouse.y  = e.clientY || _mouse.y
    _mouse.nX = ( _mouse.x / window.innerWidth ) * 2 - 1
    _mouse.nY = ( _mouse.y / window.innerHeight ) * 2 + 1
    Actions.onMouseMove( _mouse )

  }

  onMouseUp = () => {

    Actions.onMouseUp()

  }

  onMouseDown = () => {

    Actions.onMouseDown()

  }

  onWindowBlur = () => {

    Actions.onWindowBlur()

  }

  onWindowFocus = () => {

    Actions.onWindowFocus()

  }

}

export default InitialState
