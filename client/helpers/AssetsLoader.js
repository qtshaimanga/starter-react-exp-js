import AWDLoader from '../utils/webgl/AWDLoader'
import AudioManager from './AudioManager'
import VideoManager from './VideoManager'
import Actions from './../flux/actions'
import ressources from '../config/ressources'
import AssetsManager from './AssetsManager'

class AssetsLoader {

  constructor() {

    this.promises = []
    this.resources = []
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
        case 'image':
          return AssetsManager
      }

    }

    ressources.map( ressource => {

      const { type, id, url, options } = ressource

      const promise = new Promise(( resolve, reject ) => {

        getLoader( type ).load(
          url,
          resource => {

            resolve( { id, resource } )

            this.currentProgress++
            this.resources[ id ] = resource

            Actions.onResourceProgress( this.currentProgress / this.totalProgress )

            if ( this.currentProgress >= this.totalProgress ) this.load()
            if ( this.currentProgress === this.totalProgress ) Actions.onResourceReady( this.resources )

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

export default AssetsLoader
