import Store from './../../../../../flux/store'

export default class PolarBear extends THREE.Object3D {

  constructor() {

    super()

    const model = Store.getResource( 'polar-bear' )
    const material = new THREE.MeshStandardMaterial({
      color: 0x7BDFF3,
      roughness: 0.18,
      metalness: 0.5
    })

    model.traverse(( child ) => {

      if ( child instanceof THREE.Mesh ) {

        child.material = material

      }

    })
    model.scale.set( 0.2, 0.2, 0.2 )
    model.position.y = -10
    model.rotation.y = Math.PI
    
    this.add( model )

  }
  
}