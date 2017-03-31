import { withRouter } from 'react-router'
import Actions from './../../../../flux/actions'

class Wrapper extends React.Component {

  constructor( props ) {

    super()
    this.props = props

    this.pathname = this.props.location.pathname
    Actions.routeChanged( undefined, this.pathname )
    
    this.props.history.listen( ( location, action ) => {

      console.info( 'Route changed', location.pathname !== this.pathname )
      if ( location.pathname !== this.pathname ) {

        Actions.routeChanged( this.pathname, location.pathname )
        this.pathname = location.pathname

      }

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
