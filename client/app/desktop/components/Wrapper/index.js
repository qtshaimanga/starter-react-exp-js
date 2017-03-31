import { withRouter } from 'react-router'

class Wrapper extends React.Component {

  constructor( props ) {

    super()
    this.props = props
    console.log( this.props.history )
    this.props.history.listen( ( location, action ) => {

      console.info( location, action )

    } )

  }

  render() {

    return(
      <div className="main">
        { this.props.children }
      </div>
    )

  }

}

export default withRouter( Wrapper )
