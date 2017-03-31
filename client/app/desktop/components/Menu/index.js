import { Link } from 'react-router-dom'


class Menu extends React.Component {

  render() {

    return(
      <ul>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/whatever">Not Found</Link>
      </ul>
    )

  }

}

export default Menu
