import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Room
{   

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('room')
        }

        // Resource
        this.resource = this.resources.items.roomModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene;
        this.model.receiveShadow = true;
        this.scene.add(this.model)
    }
}