class BasePage extends React.Component {

  constructor( props ) {

    super( props )
    this.bind()
    this.tlIn = new TimelineMax({ paused: true })
    this.tlOut = new TimelineMax({ paused: true })

  }

  bind() {

    [ 'didTransitionInComplete', 'willTransitionIn', 'didTransitionOutComplete', 'willTransitionOut' ]
      .forEach( ( fn ) => this[ fn ] = this[ fn ].bind( this ) )

  }

  render() {

    super.render()

  }

  componentWillMount() {}

  componentDidMount() {

    this.setupAnimations()
    console.log( 'did mount' )
    
  }

  setupAnimations() {

    this.tlIn.pause(0)
    this.tlOut.pause(0)

  }

  willTransitionIn() {

    console.log( 'will in' )
    this.tlIn.eventCallback('onComplete', this.didTransitionInComplete)
    this.tlIn.timeScale(1.8)
    this.tlIn.play(0)


  }

  willTransitionOut() {

    if ( this.tlOut.getChildren().length < 1 ) {
      
      this.didTransitionOutComplete()

    } else {

      this.tlOut.eventCallback( 'onComplete', this.didTransitionOutComplete )
      this.tlOut.timeScale(1.8)
      this.tlOut.play(0)

    }

  }

  didTransitionInComplete() {

    this.tlIn.eventCallback( 'onComplete', null )
    this.props.didTransitionInComplete()

  }

  didTransitionOutComplete() {

    this.tlOut.eventCallback( 'onComplete', null )
    this.props.didTransitionOutComplete()

  }

  forceUnmount() {
    
    this.tlIn.pause(0)
    this.tlOut.pause(0)
    this.didTransitionOutComplete()

  }

  componentWillUnmount() {

    this.tlIn.kill()
    this.tlOut.kill()
    this.tlIn.clear()
    this.tlOut.clear()
    
  }

}

export default BasePage