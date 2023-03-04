import * as THREE from "three";
import { OrbitControls } from "control";
import { planets, milkywayColorTexture, sunColorTexture, sizes } from "./constant.js";

/**
 * Base
 */
// Debug
const GUI = lil.GUI;
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = milkywayColorTexture;

/**
 * Solar system
 */

// group
const solarSystem = new THREE.Group();


// sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10),
  new THREE.MeshBasicMaterial({
    map: sunColorTexture,
    transparent: true
  })
);

let planet3DObjects = [];

const createPlanets = () => {
  const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  planet3DObjects = planets.map((planet)=>{
    const geometry = new THREE.SphereGeometry(planet.radius);
    const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(planet.orbitRadius, 0.03, 16, 100),
        orbitMaterial
    );
    const material = new THREE.MeshStandardMaterial({
        map: planet.texture,
        transparent: true
      });
      const planetObj = new THREE.Mesh(geometry, material);
      planetObj.position.x = planet.orbitRadius;
      solarSystem.add(orbit, planetObj);
      orbit.rotateZ(Math.PI / 2);
      orbit.rotateY(Math.PI / 2);
      return planetObj;
  });
};

solarSystem.add(sun);
createPlanets();
scene.add(solarSystem);

/**
 * Lights
 */
// ambient light
const ambientLight = new THREE.AmbientLight("#0x333333");
scene.add(ambientLight);

// sun light
const sunLight = new THREE.PointLight("#ff7046", 20, 300);
sunLight.position.set(0, 0, 0);
solarSystem.add(sunLight);

/**
 * Sizes
 */

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = -90;
camera.position.y = 140;
camera.position.z = 140;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

sun.castShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // rotate sun
    sun.rotation.y = - Math.PI * (elapsedTime / 10);

  // rotate planets
//   planet3DObject.forEach((planet) => {
//     planet.rotation.y += Math.random() - 0.5 * 2
//     planet.rotation.x += Math.random() - 0.5 * 2
// })

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
