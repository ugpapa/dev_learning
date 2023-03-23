import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Person
{   

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder('person')
        // }

        // Resource
        this.resource = this.resources.items.personModel

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(130, 130, 130);
        this.model.position.set(20, 3, 180);
        this.model.rotateY(Math.PI)
        this.model.receiveShadow = true;
        this.scene.add(this.model)
    }
}