import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class Main extends React.Component {

  constructor( props ) {

    super( props )
    this.props = props

  }

  render() {

    return (
      <main>
        <CSSTransitionGroup
          component="div"
          trasitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
        </CSSTransitionGroup>
      </main>
    )

  }

}

export default Main
