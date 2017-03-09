import { Howl, Howler } from 'howler'
import Emitter from './Emitter'
import { events } from '../config/store'

class AudioManager {
  
  constructor() {

    this.sounds = []

    this.bind()
    this.addListeners()

  }

  bind() {

    [ 'onWindowBlur', 'onWindowFocus' ]
        .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  addListeners() {

    Emitter.on( events.WINDOW_ON_FOCUS, this.onWindowFocus )
    Emitter.on( events.WINDOW_ON_BLUR, this.onWindowBlur )

  }

  mute() {

    Howler.mute( true )

  }

  unmute() {

    Howler.mute( false )

  }

  onWindowFocus() {

    this.unmute()

  }

  onWindowBlur() {

    this.mute()

  }

  /**
   * Load audio
   * 
   * @param {String} url 
   * @param {function} onLoad 
   * @param {function} onSucess 
   * @param {function} onReject 
   * @param {String} id 
   * 
   * @memberOf AudioManager
   */
  load( url, onLoad, onSucess, onReject, id, options = { volume: 1, loop: false } ) {

    const audio = new Howl({
      src: url,
      volume: options.volume,
      loop: options.loop,
      onload: () => {

        this.sounds[ id ] = audio
        onLoad( audio )

      }
    })
    
  }

  /**
   * Get sound by id
   * 
   * @param {String} id 
   * @returns sound
   * 
   * @memberOf AudioManager
   */
  get( id ) {

    if( typeof this.sounds[ id ] === 'undefined' ) return false

    return this.sounds[ id ]

  }

  /**
   * Play sound by id
   * 
   * @param {String} id 
   * 
   * @memberOf AudioManager
   */
  play( id ) {

    if( typeof this.sounds[ id ] === 'undefined' ) return
    return this.sounds[ id ].play()

  }

  /**
   * Fade sound by id
   * 
   * @param {String} id 
   * @param {Float} start 
   * @param {Float} end 
   * @param {Int} duration (in ms)
   * @param {Int} soundId 
   * 
   * @memberOf AudioManager
   */
  fade( id, start, end, duration, soundId ) {

    this.sounds[ id ].fade( start, end, duration, soundId )

  }

  /**
   * Set the rate of playback for a sound by id
   * 
   * @param {String} id 
   * @param {Float} speed 
   * @param {Int} soundId 
   * 
   * @memberOf AudioManager
   */
  rate( id, speed, soundId ) {

    this.sounds[ id ].rate( speed, soundId )

  }

}

export default new AudioManager()