import Howler from 'howler'
import { sounds } from '../config/ressources'

export default class AudioManager {

  constructor() {

    this.sounds = {}

    for ( let i = 0; i < sounds.length; i++ ) {

      this.sounds[ sounds[i].id ] = this.load( sounds[i].file, sounds[i].options )

    }

  }

  load( name, options = { loop: false, volume: 1 } ) {

    const sound = new Howler.Howl({
      src: [ 'assets/sounds/' + name + '.mp3' ],
      loop: options.loop,
      volume: options.volume
    })

    return sound

  }

  get( id ) {

    return this.sounds[ id ]

  }

  play( id ) {

    this.sounds[ id ].play()

  }

}