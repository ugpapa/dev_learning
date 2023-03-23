import * as THREE from 'three'
import { GLTFLoader } from 'https://unpkg.com/three@0.148.0/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'https://unpkg.com/three@0.147.0/examples/jsm/loaders/DRACOLoader.js'

import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()

    // Options
    this.sources = sources
    this.setLoaders()
    this.startLoading()

    // Setup
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    this.loaders.dracoLoader = new DRACOLoader()
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file

    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}