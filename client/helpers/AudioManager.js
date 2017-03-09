import Howler from 'howler'
import { sounds } from '../config/ressources'

export default class AudioManager {

  /**
   * Creates an instance of AudioManager.
   * 
   * @memberOf AudioManager
   */
  constructor() {

    this.sounds = {}

    for ( let i = 0; i < sounds.length; i++ ) {

      this.sounds[ sounds[i].id ] = this.load( sounds[i].file, sounds[i].options )

    }

  }

  /**
   * Load sound
   * 
   * @param {String} name 
   * @param {Array} options
   * @returns 
   * 
   * @memberOf AudioManager
   */
  load( name, options = { loop: false, volume: 1 } ) {

    const sound = new Howler.Howl({

      src: [ 'assets/sounds/' + name + '.mp3' ],
      loop: options.loop,
      volume: options.volume
      
    })

    return sound

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

    this.sounds[ id ].play()

  }

}