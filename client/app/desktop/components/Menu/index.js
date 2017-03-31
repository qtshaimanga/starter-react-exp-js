import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router-dom'
import './Menu.styl'

class Menu extends React.Component {

  render() {

    return(
      <div>
        <ReactCSSTransitionGroup
        transitionName="pageSlider"
        transitionAppear={true}
        transitionAppearTimeout={5000}
        transitionEnter={false}
        transitionLeave={false}
        className="page">
          <ul>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/whatever">Not Found</Link>
          </ul>
        </ReactCSSTransitionGroup>
      </div>
    )

  }

}

export default Menu
