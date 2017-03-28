import './../../style/app.styl'
import AppTemplate from './template'

export default class App {

  init() {
    
    ReactDOM.render(
      <AppTemplate />,
      dom.select( '.app' )
    )

  }

}