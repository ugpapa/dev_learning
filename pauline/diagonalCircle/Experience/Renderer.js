import * as THREE from 'three'
import Experience from './Experience.js';

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
        })
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.instance.shadowMap.enabled = true;
        this.instance.setSize(this.sizes.width, this.sizes.height);
    }

    resize()
    {   
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}