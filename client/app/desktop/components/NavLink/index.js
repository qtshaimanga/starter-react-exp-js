import Actions from './../../../../flux/actions'

class NavLink extends React.Component {

  constructor( props ) {

    super( props )
    this.props = props

  }

  componentWillMount() {

    this.changePage = this.changePage.bind( this )

  }

  render() {

    return (

      <div className="navigation__item" onClick={ this.changePage }>
        <div className="navigation__title">{ this.props.title }</div>
      </div>

    )

  }

  changePage() {

    Actions.changePage( this.props.to )

  }


}

export default NavLink