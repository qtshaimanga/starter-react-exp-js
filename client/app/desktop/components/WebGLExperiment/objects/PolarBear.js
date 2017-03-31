import Store from './../../../../../flux/store'
import EventsConstants from './../../../../../flux/constants/EventsConstants'

export default class PolarBear extends THREE.Object3D {

  constructor() {

    super()

    this.config = {
      rotation: {
        active: Math.PI,
        inactive: Math.PI / 2
      }
    }

    this.model = Store.getResource( 'polar-bear' )
    const material = new THREE.MeshStandardMaterial({
      color: 0x7BDFF3,
      roughness: 0.18,
      metalness: 0.5
    })

    this.model.traverse(( child ) => {

      if ( child instanceof THREE.Mesh ) {

        child.material = material

      }

    })
    this.model.scale.set( 0.2, 0.2, 0.2 )
    this.model.position.y = -10
    this.model.rotation.y = Store.Routes.newRoute === '/about' ? this.config.rotation.active : this.config.rotation.inactive
    this.add( this.model )

    this.routeChanged = this.routeChanged.bind( this )
    this.addListeners()

  }

  addListeners() {

    Store.on( EventsConstants.ROUTE_CHANGED, this.routeChanged )

  }

  routeChanged( routes ) {

    if ( routes.newRoute === '/about' ) this.rotate( this.config.rotation.active )
    else this.rotate( this.config.rotation.inactive )

  }

  rotate( angle ) {

    TweenMax.to( this.model.rotation, 0.3, { y: angle, ease: Expo.easeOut } )

  }
  
}