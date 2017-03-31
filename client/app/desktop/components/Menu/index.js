import './Menu.styl'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { NavLink } from 'react-router-dom'

class Menu extends React.Component {

  render() {

    return(
      <ReactCSSTransitionGroup
      component="nav"
      transitionName="pageSlider"
      transitionAppear={true}
      transitionAppearTimeout={3000}
      transitionEnter={false}
      transitionLeave={false}
      className="navigation">
        <ul className="navigation__list">
          <NavLink exact to="/" className="navigation__item" activeClassName="navigation__item--active">Home</NavLink>
          <NavLink to="/about" className="navigation__item" activeClassName="navigation__item--active">About</NavLink>
          <NavLink to="/whatever" className="navigation__item" activeClassName="navigation__item--active">Not Found</NavLink>
        </ul>
      </ReactCSSTransitionGroup>
    )

  }

}

export default Menu
