import Experience from "../Experience.js";
import * as THREE from "three";

export default class Particles {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.particles = null;
    this.particleMaterial = null;
    this.particleGeometry = null;
    this.debug = this.experience.debug;
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("particles");
    }
    this.removeParticles();
    this.generateGalaxy();
  }

  removeParticles() {
    // avoid memory leaks
    if (this.particles !== null) {
      this.particleGeometry.dispose(); // free the memory from the GPU
      this.particleMaterial.dispose();
      this.scene.remove(this.particles);
    }
  }

  generateGalaxy() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    this.parameters = {
      count: 3000, // number of total particles
      size: 0.1, // particles size
      radius: 20,
      branches: 3,
      spin: 0.9,
      randomNess: 0.2,
      randomNessPow: 3,
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
    };

    /**
     * Geometry
     */
    this.particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);

    const colorInside = new THREE.Color(this.parameters.insideColor);
    const colorOutside = new THREE.Color(this.parameters.outsideColor);

    for (let i = 0; i < positions.length; i++) {
      const index3D = i * 3;
      const radius = Math.random() * this.parameters.radius;
      // bigger number multiple with pi will get curvier spin
      const spinAngle = radius * this.parameters.spin;
      // divide the circle into 3 points and multiple with pi
      const branchAngle =
        ((i % this.parameters.branches) / this.parameters.branches) *
        Math.PI *
        2;

      // make it have a lot of particles nearer
      const randomX =
        Math.pow(Math.random(), this.parameters.randomNessPow) *
        (Math.random() < 0.5 ? 1 : -1);
      const randomY =
        Math.pow(Math.random(), this.parameters.randomNessPow) *
        (Math.random() < 0.5 ? 1 : -1);
      const randomZ =
        Math.pow(Math.random(), this.parameters.randomNessPow) *
        (Math.random() < 0.5 ? 1 : -1);

      positions[index3D + 0] =  Math.cos(branchAngle + spinAngle) * radius + randomX; // x
      positions[index3D + 1] =  randomY; // y
      positions[index3D + 2] =  Math.sin(branchAngle + spinAngle) * radius + randomZ; // z

      /**
       * Color
       */
      // lerp will change the color of the original value --> need to clone it first
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / this.parameters.radius);
      colors[index3D] = mixedColor.r; // Red
      colors[index3D + 1] = mixedColor.g; // Green
      colors[index3D + 2] = mixedColor.b; // Blue
    }
    this.particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    /**
     * Materials
     */
    this.particleMaterial = new THREE.PointsMaterial({
      size: this.parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    /**
     * Points
     */
    this.particles = new THREE.Points(
      this.particleGeometry,
      this.particleMaterial
    );
    this.particles.position.y = -5;
    this.particles.receiveShadow = true;
    this.scene.add(this.particles);

    if (this.debug.active) {
      this.debugFolder
        .add(this.parameters, "count")
        .min(100)
        .max(10000)
        .step(100)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .add(this.parameters, "size")
        .min(0.001)
        .max(0.1)
        .step(0.001)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .add(this.parameters, "radius")
        .min(0.01)
        .max(20)
        .step(0.01)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .add(this.parameters, "branches")
        .min(3)
        .max(25)
        .step(1)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .add(this.parameters, "spin")
        .min(-20)
        .max(20)
        .step(1)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .add(this.parameters, "randomNess")
        .min(0)
        .max(2)
        .step(0.001)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .add(this.parameters, "randomNessPow")
        .min(0)
        .max(5)
        .step(1)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .addColor(this.parameters, "insideColor")
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .addColor(this.parameters, "outsideColor")
        .onFinishChange(this.generateGalaxy);
    }
  }
}
