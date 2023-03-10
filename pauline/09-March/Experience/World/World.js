import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Furniture from "./Furniture.js";
import * as THREE from "three";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.furniture = new Furniture();         
      this.environment = new Environment();
    });
  }

  update() {
    if (this.furniture) {
      this.furniture.update();
    }
  }
}
