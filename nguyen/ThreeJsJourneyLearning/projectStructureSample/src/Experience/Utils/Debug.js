import * as dat from 'https://unpkg.com/lil-gui@0.16.1/dist/lil-gui.esm.js'

export default class Debug {
  constructor() {
    this.active = window.location.hash === '#debug'

    if (this.active) {
      this.ui = new dat.GUI()
    }
  }
}