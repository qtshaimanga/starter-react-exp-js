class Home extends React.Component {

  constructor( props ) {

    super( props )
    this.tl = new TimelineMax({ paused: true })

  }

  componentDidMount(){

    console.log("mount",this.tl)
    // this.transitionIn()

  }

  componentWillUnmount(){

    console.log("unmount", this.tl)
    // this.transitionOut()

  }

  transitionIn() {

    //this.tlIn.play( 0 )

  }


  transitionOut() {

    //this.tlOut.play( 0 )

  }

  render() {

    return(
      <div className="page">
        <h1>Home</h1>
      </div>
    )

  }

}

export default Home
