export default class Icosahedron extends THREE.Object3D {

  constructor() {

    super()

    const geometry = new THREE.IcosahedronBufferGeometry( 50, 2 )
    const material = new THREE.MeshStandardMaterial({
      color: 0xAAAAAA,
      emissive: 0xAAAAAA,
      roughness: 0.7,
      metalness: 1,
      wireframe: true,
      wireframeLinewidth: 1
    })

    const mesh = new THREE.Mesh( geometry, material )

    this.add(mesh)
    
  }

}