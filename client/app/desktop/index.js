import './../../style/app.styl'
import AppTemplate from './template'
import InitialState from '../../config/initialState'

export default class App {

  init() {

    //TODO import initialState
    this.initialState = new InitialState()

    ReactDOM.render(
      <AppTemplate />,
      dom.select( '.app' )
    )

  }

}
