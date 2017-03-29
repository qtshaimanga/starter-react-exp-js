import { EventEmitter2 } from 'eventemitter2'
import assign from 'object-assign'
import Dispatcher from './dispatcher'


const Store = assign({}, EventEmitter2.prototype, {

  Size: { w: window.innerWidth, h: window.innerHeight },
  Mouse: { x: 0, y: 0, nX: 0, nY: 0 },
  Device:  { mobile: false, supportWebGL: false },

})

Store.dispatchToken = Dispatcher.register(( payload ) => {

  const actionType = payload.type
  const item = payload.item

  switch ( actionType ) {
      break;
    default:
      Store.emit( actionType, item )
      break
  }

})

export default Store
