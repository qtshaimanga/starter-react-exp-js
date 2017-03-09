class VideoManager {

  constructor() {

    this.videos = []

  }

  /**
   * Load video
   * 
   * @param {String} url 
   * @param {function} onLoad 
   * @param {function} onSucess 
   * @param {function} onReject 
   * @param {String} id 
   * 
   * @memberOf VideoManager
   */
  load( url, onLoad, onSucess, onReject, id ) {

    const request = document.createElement('video')

    request.addEventListener( 'canplaythrough', () => {

      onLoad(request)

    }, false)

    request.addEventListener( 'error', onReject, false )
    request.preload = 'auto'
    request.src = url
    request.load()
    
    this.videos[id] = request

  }

}

export default new VideoManager()