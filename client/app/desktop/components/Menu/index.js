import './Menu.styl'
import { NavLink } from 'react-router-dom'

class Menu extends React.Component {

  render() {

    return(
      <div className="navigation">
        <ul className="navigation__list">
          <NavLink exact to="/" className="navigation__item" activeClassName="navigation__item--active">Home</NavLink>
          <NavLink to="/about" className="navigation__item" activeClassName="navigation__item--active">About</NavLink>
          <NavLink to="/whatever" className="navigation__item" activeClassName="navigation__item--active">Not Found</NavLink>
        </ul>
      </div>
    )

  }

}

export default Menu
