import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Particles from './Particles.js';
export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.particles = new Particles();
      this.environment = new Environment();
    });
  }
}
