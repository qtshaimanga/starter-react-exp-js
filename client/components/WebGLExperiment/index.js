import Scene from './core/Scene'

export default class WebGLExperiment {

  constructor( root, ressources ) {

    this.root = root
    this.ressources = ressources

    this.start()

  }

  start() {

    this.scene = new Scene( this.resources )
    this.sceneDomEl = this.scene.renderer.domElement
    
    this.root.appendChild( this.sceneDomEl )

  }

}