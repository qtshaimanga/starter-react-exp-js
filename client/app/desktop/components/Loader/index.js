import './Loader.styl'
import Store from './../../../../flux/store'
import Actions from './../../../../flux/actions'
import EventsConstants from './../../../../flux/constants/EventsConstants'

class Loader extends React.Component {

  constructor() {

    super()

    this.progress = 0
    this.tweenProgress = 0
    this.canTween = true
    this.state = {
      progress: '0%'
    }

  }

  render() {

    return(

      <div className="loader" ref="parent">
        <div className="loader__container">
          <div className="loader__progress" ref="progress">{ this.state.progress }</div>
          <div className="loader__bar" ref="bar"></div>
        </div>
      </div>

    )    

  }

  componentDidMount() {

    this.bind()
    this.addListeners()

  }

  bind() {

    this.onResourceProgress = this.onResourceProgress.bind( this )

  }

  addListeners() {

    Store.on( EventsConstants.RESOURCES_PROGRESS, this.onResourceProgress )

  }

  onResourceProgress( p ) {

    this.progress = Math.ceil( p * 100 )

    TweenMax.to( this.refs.bar, 2, { scaleX: p, ease: Expo.easeOut } )

    if( this.progress === 100 ) {

      TweenMax.to(this, 1, { tweenProgress: this.progress, onUpdate: () => {

        this.progress = Math.ceil( this.tweenProgress )
        this.setState({
          progress: `${ this.progress }%`
        })

      } })

      TweenMax.to( [ this.refs.progress, this.refs.bar ], 1, { opacity: 0, ease: Sine.easeIn, onComplete: () => {

        Actions.startApp()

      } })

      TweenMax.to( this.refs.parent, 1, { opacity: 0, ease: Sine.easeIn, delay: 1, onComplete: () => {

        this.refs.parent.style.display = 'none'

      } })

    }
    else if ( this.progress <= 100 ) {

      TweenMax.to(this, 1, { tweenProgress: this.progress, onUpdate: () => {

        this.progress = Math.ceil( this.tweenProgress )
        this.setState({
          progress: `${ this.progress }%`
        })

      } })

    } else {

      this.progress = 0
      this.tweenProgress = 0
      this.setState({
        progress: `${ this.progress }%`
      })

    }

  }

}

export default Loader
