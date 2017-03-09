import Emitter from '../helpers/Emitter'
import { events } from '../config/store'

/**
* Loader component
*/
class Loader {

  constructor() {

    this.$el = document.querySelector( '.loader' )

    this.$els = {
      progress: this.$el.querySelector( '.loader__progress' ),
      bar: this.$el.querySelector( '.loader__bar' )
    }

    this.progress = 0
    this.tweenProgress = 0
    this.canTween = true

    this.bind()
    this.addListeners()

  }

  bind() {

    this.onResourceProgress = this.onResourceProgress.bind( this )

  }

  addListeners() {

    Emitter.on( events.RESSOURCES_PROGRESS, this.onResourceProgress )

  }

  onResourceProgress( p ) {

    this.progress = Math.ceil( p * 100 )

    TweenMax.to( this.$els.bar, 2, { scaleX: p, ease: Expo.easeOut } )

    if( this.progress === 100 ) {

      TweenMax.to(this, 1, { tweenProgress: this.progress, onUpdate: () => {

        this.progress = Math.ceil( this.tweenProgress )
        this.$els.progress.innerHTML = `${this.progress}%`

      } })

      TweenMax.to( this.$el, 1, { opacity: 0, ease: Expo.easeOut, delay: 0.5, onComplete: () => {

        this.$el.style.display = 'none'
        Emitter.emit( events.APP_START )

      } })

    }
    else if ( this.progress <= 100 ) {

      TweenMax.to(this, 1, { tweenProgress: this.progress, onUpdate: () => {

        this.progress = Math.ceil( this.tweenProgress )
        this.$els.progress.innerHTML = `${this.progress}%`

      } })

    } else {
      
      this.progress = 0
      this.tweenProgress = 0
      this.$els.progress.innerHTML = `${this.progress}%`

    }

  }

}

export default Loader