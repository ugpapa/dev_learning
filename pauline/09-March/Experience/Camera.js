import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "control";
import EventEmitter from "./Utils/EventEmitter.js";
import { cameraSettings } from "./constant.js";

export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      70,
      this.sizes.width / this.sizes.height,
      0.1,
      3000
    );
    this.instance.position.set(350, 300, 50);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enabled = false;
    this.controls.listenToKeyEvents(window);
    this.controls.keys = {
      LEFT: "KeyA",
      UP: "KeyW",
      RIGHT: "KeyD",
      BOTTOM: "KeyS",
    };
    this.setRestrictControl();
    window.addEventListener("wheel", () => {
      this.setRestrictControl();
      this.trigger("wheel");
    });
    //TODO: find out keydown movement
    window.addEventListener("keydown", () => {
      this.trigger("keydown");
    });
  }

  setRestrictControl() {
    console.log(this.instance.position);
    // how far can you dolly in perspective view
    // this.controls.minDistance = cameraSettings.minDistance // how far can you dolly in
    // this.controls.maxDistance = cameraSettings.maxDistance // how far can you dolly out

    // Limit vertical rotations --> 0 to PI
    // this.controls.minPolarAngle = cameraSettings.minPolarAngle// how far can you dolly vertically in
    // this.controls.maxPolarAngle = cameraSettings.maxAzimuthAngle // how far can you dolly vertically out

    // Limit horizontal rotation
    // this.controls.minAzimuthAngle = cameraSettings.minAzimuthAngle
    // this.controls.maxAzimuthAngle = cameraSettings.maxAzimuthAngle
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // this.controls.update();
  }
}
