export default class PolarBear extends THREE.Object3D {

  constructor( model ) {

    super()

    const material = new THREE.MeshStandardMaterial({
      color: 0x7BDFF3,
      roughness: 0.18,
      metalness: 0.5
    })

    model.traverse((child) => {

      if (child instanceof THREE.Mesh) {

        child.material = material

      }

    })
    model.scale.set( 0.2, 0.2, 0.2 )
    model.position.y = -10
    model.rotation.y = Math.PI
    
    this.add( model )

  }
  
}