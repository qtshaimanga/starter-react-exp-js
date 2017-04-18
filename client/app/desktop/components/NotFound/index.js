import Page from './../base/Page'

class NotFound extends Page {

  constructor( props ) {

    super( props )
    this.history = props.history

  }

  componentDidMount() {

    super.componentDidMount()

  }

  setupAnimations(){

    super.setupAnimations()
    this.tlIn.set( this.refs.parent, { visibility: 'visible' } )
    this.tlIn.fromTo( this.refs.parent, 0.5, { opacity: 0, x: 500 }, { opacity: 1, x: 0 })
    this.tlOut.fromTo( this.refs.parent, 0.5, { opacity: 1, x: 0 }, { opacity: 0, x: 500 })

  }

  render() {

    return(
      <div className="page" ref="parent">
        <h1>NotFound</h1>
      </div>
    )

  }
  didTransitionOutComplete() {

    super.didTransitionOutComplete()
    this.history.push( this.nextPath )

  }

}

export default NotFound
