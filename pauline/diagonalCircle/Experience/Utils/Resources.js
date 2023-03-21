import * as THREE from "three";
import { GLTFLoader } from "gltfLoader";
import EventEmitter from "./EventEmitter.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    const loaderMap = {
      gltfModel: this.loaders.gltfLoader,
      texture: this.loaders.textureLoader,
      cubeTexture: this.loaders.cubeTextureLoader,
    };
    // Load each source
    for (const source of this.sources) {
      loaderMap[source.type].load(source.path, (file) => {
        this.sourceLoaded(source, file);
      });
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
