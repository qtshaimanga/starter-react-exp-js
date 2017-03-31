import { withRouter } from 'react-router'

class Wrapper extends React.Component {

  constructor( props, context ) {

    super()
    this.props = props
    this.props.history.listen( ( location, action ) => {

      console.log( location, action )

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
