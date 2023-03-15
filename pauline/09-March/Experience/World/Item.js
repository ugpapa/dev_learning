import * as THREE from "three";
import Experience from "../Experience.js";
import gsap from "gsap";

export default class Item {
  constructor(model, settings, isDoneAnimation) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.settings = settings;
    this.isDoneAnimation = isDoneAnimation;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder(settings.name);
    }

    // Resource
    this.resource = model;

    this.setModel();
    this.setMovement();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(
      this.settings.scale.x,
      this.settings.scale.y,
      this.settings.scale.z
    );
    this.model.position.set(
      this.settings.position.x,
      this.settings.position.y,
      this.settings.position.z
    );
    this.model.receiveShadow = true;
    if (this.settings.rotation) {
      this.model.rotateX(this.settings.rotation.x);
      this.model.rotateY(this.settings.rotation.y);
      this.model.rotateZ(this.settings.rotation.z);
    }
    this.scene.add(this.model);
  }

  setMovement() {
    if (this.isDoneAnimation){
        const t1 = gsap.timeline();
    this.experience.camera.instance.rotation.set(0, this.settings.rotation.y, 0);
    t1.to(this.experience.camera.instance.position, {
        x: this.settings.t1.x,
        duration: 3,
        onUpdate: () => {
            this.experience.camera.instance.lookAt(this.settings.t1.lookAt.x,this.settings.t1.lookAt.y, this.settings.t1.lookAt.z);
        },
      });
      t1.to(this.experience.camera.instance.position, {
        z: this.settings.t2.z,
        duration: 3,
        onUpdate: () => {
            this.experience.camera.instance.lookAt(this.settings.t2.lookAt.x,this.settings.t2.lookAt.y, this.settings.t2.lookAt.z);
            this.isDoneAnimation = false;
        },
      });   
    }
  }
}
