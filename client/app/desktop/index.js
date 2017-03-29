import './../../style/app.styl'
import AppTemplate from './template'

export default class App {

  init() {
    //TODO import initialState

    ReactDOM.render(
      <AppTemplate />,
      dom.select( '.app' )
    )

  }

}
