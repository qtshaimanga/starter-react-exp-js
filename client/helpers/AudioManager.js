import { Howl, Howler } from 'howler'
import Store from './../flux/store'
import EventsConstants from './../flux/constants/EventsConstants'

class AudioManager {

  constructor() {

    this.blockMute = false

    this.bind()
    this.addListeners()

  }

  bind() {

    [ 'onWindowBlur', 'onWindowFocus' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  addListeners() {

    Store.on( EventsConstants.WINDOW_ON_FOCUS, this.onWindowFocus )
    Store.on( EventsConstants.WINDOW_ON_BLUR, this.onWindowBlur )

  }

  mute() {

    Howler.mute( true )

  }

  unmute() {

    Howler.mute( false )
    this.blockMute = false

  }

  lockMute() {

    this.blockMute = true
    this.mute()

  }

  onWindowFocus() {

    if( this.blockMute ) return
    this.unmute()

  }

  onWindowBlur() {

    this.mute()

  }

  /**
   * Load audio file
   * @param {string} url
   * @param {function} onLoad
   * @param {function} onSucess
   * @param {function} onReject
   * @param {string} id
   * @param {array} options
   */
  load( url, onLoad, onSucess, onReject, id, options = { volume: 1, loop: false } ) {

    const audio = new Howl({
      src: url,
      volume: options.volume,
      loop: options.loop,
      onload: () => {

        onLoad( audio )

      }
    })

  }

  /**
   * Get sound by id
   * @param {string} id
   */
  get( id ) {

    const sound = Store.getResource( id )

    if( typeof sound === 'undefined' ) return false
    return sound

  }

  /**
   * Play sound by id
   * @param {string} id
   */
  play( id ) {

    const sound = Store.getResource( id )

    if( typeof sound === 'undefined' ) return
    return sound.play()

  }

  /**
   * Fade sound by id
   * @param {string} id
   * @param {float} start
   * @param {float} end
   * @param {float} duration
   * @param {int} soundId
   */
  fade( id, start, end, duration, soundId ) {

    const sound = Store.getResource( id )
    sound.fade( start, end, duration, soundId )

  }

  /**
   * Rate sound at id
   * @param {string} id
   * @param {float} speed
   * @param {int} soundId
   */
  rate( id, speed, soundId ) {

    const sound = Store.getResource( id )
    sound.rate( speed, soundId )

  }

}

export default new AudioManager()
