import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Item
{   
    constructor(model, settings)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.settings = settings

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('painting')
        }

        // Resource
        this.resource = model

        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(this.settings.scale.x, this.settings.scale.y, this.settings.scale.z)
        this.model.position.set(this.settings.position.x, this.settings.position.y, this.settings.position.z)
        this.model.receiveShadow = true;
        if (this.settings.rotation){
            this.model.rotateX(this.settings.rotation.x);
            this.model.rotateY(this.settings.rotation.y);
            this.model.rotateZ(this.settings.rotation.z);
        }
        this.scene.add(this.model)
    }

}