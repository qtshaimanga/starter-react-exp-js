import AppTemplate from './template'
import InitialState from '../../config/initialState'

export default class App {

  init() {

    this.initialState = new InitialState()

    ReactDOM.render(
      <AppTemplate />,
      dom.select( '.app' )
    )

  }

}
