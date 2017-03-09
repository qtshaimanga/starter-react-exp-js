import AWDLoader from '../utils/webgl/AWDLoader'
import AudioManager from './AudioManager'
import VideoManager from './VideoManager'
import Emitter from './Emitter'
import ressources from '../config/ressources'
import { events } from '../config/store'

class AssetsLoader {

  constructor() {

    this.promises = []
    this.totalProgress = ressources.length
    this.currentProgress = 0

    const getLoader = type => {

      switch( type ) {

        case 'model':
          return new AWDLoader()
        case 'texture':
          return new THREE.TextureLoader()
        case 'audio':
          return AudioManager
        case 'video':
          return VideoManager

      }

    }

    ressources.map( ressource => {

      const { type, id, url, options } = ressource

      const promise = new Promise( ( resolve, reject ) => {

        getLoader( type ).load(
          url,
          resource => {

            resolve( { id, resource } )

            this.currentProgress++

            Emitter.emit( events.RESSOURCES_PROGRESS, this.currentProgress / this.totalProgress )

            if(this.currentProgress >= this.totalProgress) this.load()

          },
          () => null,
          () => reject,
          id,
          options
        )

      })

      this.promises.push( promise )

    })

  }

  load() {

    return Promise.all( this.promises )
    
  }

}

export default new AssetsLoader()