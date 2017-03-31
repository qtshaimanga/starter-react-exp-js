import AssetsLoader from 'assets-loader'


class AssetsManager {

  constructor(){

    this.assetsLoader = new AssetsLoader()

  }

  load( url, onLoad, onSucess, onReject, id ) {

    let loader = this.assetsLoader.add(url)
      .on('error', function( error ) {

        throw new Error("loading error", error );

      })
      .on('complete', function( map ) {

        loader.get().forEach( function( file ) {

          onLoad( file )

        })

      })
    .start()

  }

}

export default new AssetsManager()
