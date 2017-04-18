import './Menu.styl'
import NavLink from './../NavLink'

class Menu extends React.Component {

  render() {

    return(
      <div className="navigation">
        <ul className="navigation__list">
          <NavLink to="/" title="Home" />
          <NavLink to="/about" title="About" />
          <NavLink to="/whatever" title="Not Found" />
        </ul>
      </div>
    )

  }

}

export default Menu
