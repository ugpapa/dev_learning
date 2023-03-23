import Experience from "../Experience.js";
import * as THREE from "three";
import random from "@lodash/random";
import galaxyVerterShader from "vertex";
import galaxyFragmentShader from "fragment";

export default class Particles {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.particles = null;
    this.material = null;
    this.geometry = null;
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
      this.geometry.dispose(); // free the memory from the GPU
      this.material.dispose();
      this.scene.remove(this.particles);
    }
  }

  generateGalaxy() {
    this.parameters = {
      count: 200000, // number of total particles
      size: 5, // particles size
      radius: 10,
      branches: 5,
      spin: 0.65,
      randomNess: 0.72,
      randomNessPow: 2.3,
      insideColor: "#ffffff",
      middleColor: "#8134f5",
      outsideColor: "#1b3984",
    };

    /**
     * Geometry
     */
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    const scales = new Float32Array(this.parameters.count * 1);
    const randomness = new Float32Array(this.parameters.count * 3);

    const insideColor = new THREE.Color(this.parameters.insideColor);
    const middleColor = new THREE.Color(this.parameters.middleColor);
    const outsideColor = new THREE.Color(this.parameters.outsideColor);

    for (let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;

      const isSmaller = Math.random() < 0.5;
      // Position
      const radius =
        i > this.parameters.count / 2
          ? random(0, 0.4) * this.parameters.radius
          : random(isSmaller ? 0.4 : 0.8, 1) * this.parameters.radius;

      const branchAngle =
        ((i % this.parameters.branches) / this.parameters.branches) *
        Math.PI *
        2.1;

      const spinAngle = radius * this.parameters.spin;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

      let randomX = null;
      let randomZ = null;

      const innerRadius = this.parameters.radius / 3;
      const isInnerCircle =
        positions[i3] < innerRadius &&
        positions[i3 + 2] < innerRadius &&
        positions[i3] > -innerRadius &&
        positions[i3 + 2] > -innerRadius;

        //TODO: simplify this part
      if (isInnerCircle) {
        randomX =
          Math.pow(Math.random(), 1.75) *
          (Math.random() < 0.5 ? 1 : -1) *
          0.95 *
          radius;
        randomZ =
          Math.pow(Math.random(), 1.75) *
          (Math.random() < 0.5 ? 1 : -1) *
          0.95 *
          radius;
      } else {
        randomX =
          Math.pow(Math.random(), this.parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          this.parameters.randomness *
          radius;
        randomZ =
          Math.pow(Math.random(), this.parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          this.parameters.randomness *
          radius;
      }

      const randomY = this.parameters.randomness * 0.5 * radius;

      randomness[i3] = randomX;
      randomness[i3 + 1] = randomY;
      randomness[i3 + 2] = randomZ;

      // Scale
      scales[i] = Math.random();

      // Color
      const mixedColor = insideColor.clone();

      mixedColor.lerp(middleColor, radius / 3);
      const mixedColor2 = mixedColor.clone();
      mixedColor2.lerp(outsideColor, radius / this.parameters.radius);

      colors[i3] = mixedColor2.r;
      colors[i3 + 1] = mixedColor2.g;
      colors[i3 + 2] = mixedColor2.b;
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute(
      "aRandomness",
      new THREE.BufferAttribute(randomness, 3)
    );

    /**
     * Material
     */
    this.material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: galaxyVerterShader,
      fragmentShader: galaxyFragmentShader,
      uniforms: {
        uSize: {
          value: 30 * this.experience.renderer.instance.getPixelRatio(),
        },
        uTime: { value: 0 },
      },
    });

    /**
     * Points
     */
    const points = new THREE.Points(this.geometry, this.material);
    this.scene.add(points);

    if (this.debug.active) {
      this.debugFolder
        .add(this.parameters, "count")
        .min(100)
        .max(1000000)
        .step(100)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .add(this.parameters, "radius")
        .min(0.01)
        .max(20)
        .step(0.01)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .add(this.parameters, "branches")
        .min(2)
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
        .max(10)
        .step(0.001)
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .addColor(this.parameters, "insideColor")
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .addColor(this.parameters, "middleColor")
        .onFinishChange(this.generateGalaxy);
      this.debugFolder
        .addColor(this.parameters, "outsideColor")
        .onFinishChange(this.generateGalaxy);
    }
  }
}
