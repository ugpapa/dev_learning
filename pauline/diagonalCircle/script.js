import Experience from './Experience/Experience.js'
const experience = new Experience(document.querySelector('canvas.webgl'));
// import * as THREE from "three";
// import { OrbitControls } from "control";
// import galaxyVerterShader from "vertex";
// import galaxyFragmentShader from "fragment";
// import random from '@lodash/random';
// /**
//  * Base
//  */
// // Debug
// const GUI = lil.GUI;
// const gui = new GUI();

// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// /**
//  * Galaxy
//  */
// const parameters = {};
// parameters.count = 200000;
// parameters.size = 5;
// parameters.radius = 10;
// parameters.branches = 5;
// parameters.spin = 0.65;
// parameters.randomness = 0.72;
// parameters.randomnessPower = 2.3;
// parameters.insideColor = "#ffffff";
// parameters.middleColor = "#8134f5";
// parameters.outsideColor = "#1b3984";

// let geometry = null;
// let material = null;
// let points = null;

// const generateGalaxy = () => {
//   if (points !== null) {
//     geometry.dispose();
//     material.dispose();
//     scene.remove(points);
//   }

//   /**
//    * Geometry
//    */
//   geometry = new THREE.BufferGeometry();

//   const positions = new Float32Array(parameters.count * 3);
//   const colors = new Float32Array(parameters.count * 3);
//   const scales = new Float32Array(parameters.count * 1);
//   const randomness = new Float32Array(parameters.count * 3);

//   const insideColor = new THREE.Color(parameters.insideColor);
//   const middleColor = new THREE.Color(parameters.middleColor);
//   const outsideColor = new THREE.Color(parameters.outsideColor);

//   for (let i = 0; i < parameters.count; i++) {
//     const i3 = i * 3;

//     const isSmaller = Math.random() < 0.5;
//     // Position
//     const radius =
//       i > parameters.count / 2
//         ? random(0, 0.4) * parameters.radius
//         : random(isSmaller ? 0.4 : 0.8, 1) * parameters.radius;

//     const branchAngle =
//       ((i % parameters.branches) / parameters.branches) * Math.PI * 2.1;

//     const spinAngle = radius * parameters.spin;

//     positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
//     positions[i3 + 1] = 0;
//     positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

//     let randomX = null;
//     let randomZ = null;

//     const innerRadius = parameters.radius / 3;
//     if (
//       positions[i3] < innerRadius &&
//       positions[i3 + 2] < innerRadius &&
//       positions[i3] > -innerRadius &&
//       positions[i3 + 2] > -innerRadius
//     ) {
//       randomX =
//         Math.pow(Math.random(), 1.75) *
//         (Math.random() < 0.5 ? 1 : -1) *
//         0.95 *
//         radius;
//       randomZ =
//         Math.pow(Math.random(), 1.75) *
//         (Math.random() < 0.5 ? 1 : -1) *
//         0.95 *
//         radius;
//     } else {
//       randomX =
//         Math.pow(Math.random(), parameters.randomnessPower) *
//         (Math.random() < 0.5 ? 1 : -1) *
//         parameters.randomness *
//         radius;
//       randomZ =
//         Math.pow(Math.random(), parameters.randomnessPower) *
//         (Math.random() < 0.5 ? 1 : -1) *
//         parameters.randomness *
//         radius;
//     }

//     const randomY =
//       parameters.randomness * 0.5 *
//       radius;

//     randomness[i3] = randomX;
//     randomness[i3 + 1] = randomY;
//     randomness[i3 + 2] = randomZ;

//     // Scale
//     scales[i] = Math.random();

//     // Color
//     const mixedColor = insideColor.clone();

//     mixedColor.lerp(middleColor, radius / 3);
//     const mixedColor2 = mixedColor.clone();
//     mixedColor2.lerp(outsideColor, radius / parameters.radius);

//     colors[i3] = mixedColor2.r;
//     colors[i3 + 1] = mixedColor2.g;
//     colors[i3 + 2] = mixedColor2.b;
//   }

//   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//   geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
//   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//   geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
//   geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
//   geometry.setAttribute(
//     "aRandomness",
//     new THREE.BufferAttribute(randomness, 3)
//   );

//   /**
//    * Material
//    */
//   material = new THREE.ShaderMaterial({
//     depthWrite: false,
//     blending: THREE.AdditiveBlending,
//     vertexColors: true,
//     vertexShader: galaxyVerterShader,
//     fragmentShader: galaxyFragmentShader,
//     uniforms: {
//       uSize: { value: 30 * renderer.getPixelRatio() },
//       uTime: { value: 0 },
//     },
//   });

//   /**
//    * Points
//    */
//   points = new THREE.Points(geometry, material);
//   scene.add(points);
// };

// gui
//   .add(parameters, "count")
//   .min(100)
//   .max(1000000)
//   .step(100)
//   .onFinishChange(generateGalaxy);
// gui
//   .add(parameters, "radius")
//   .min(0.01)
//   .max(20)
//   .step(0.01)
//   .onFinishChange(generateGalaxy);
// gui
//   .add(parameters, "branches")
//   .min(2)
//   .max(20)
//   .step(1)
//   .onFinishChange(generateGalaxy);
// gui
//   .add(parameters, "randomness")
//   .min(0)
//   .max(2)
//   .step(0.001)
//   .onFinishChange(generateGalaxy);
// gui
//   .add(parameters, "randomnessPower")
//   .min(0)
//   .max(10)
//   .step(0.001)
//   .onFinishChange(generateGalaxy);
// gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
// gui.addColor(parameters, "middleColor").onFinishChange(generateGalaxy);
// gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
//   100,
//   sizes.width / sizes.height,
//   0.1,
//   1000
// );
// camera.position.x = 3;
// camera.position.y = 5;
// camera.position.z = 12;
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// generateGalaxy();

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   // Update material
//   material.uniforms.uTime.value = elapsedTime;

//   if (points !== null) {
//     points.rotation.x =  0.025;
//     points.rotation.y = elapsedTime * 0.05;
//   }

//   // Update controls
//   controls.update();

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();
