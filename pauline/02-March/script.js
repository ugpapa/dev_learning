import * as THREE from "three";
import { OrbitControls } from "control";
import {
  planets,
  milkywayColorTexture,
  sunColorTexture,
  sizes,
  moonColorTexture,
} from "./constant.js";
import { gsap } from "gsap";

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
  new THREE.SphereGeometry(15),
  new THREE.MeshBasicMaterial({
    map: sunColorTexture,
    transparent: true,
  })
);

const createPlanets = () => {
  const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  return planets.map((planet) => {
    const planet3DObject = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(planet.radius);
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(planet.orbitRadius, 0.03),
      orbitMaterial
    );
    const material = new THREE.MeshStandardMaterial({
      map: planet.texture,
      transparent: true,
    });
    const planetObj = new THREE.Mesh(geometry, material);
    if (planet.name === "earth") {
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(2.5),
        new THREE.MeshStandardMaterial({
          map: moonColorTexture,
          transparent: true,
        })
      );
      moon.position.x = 10;
      planetObj.add(moon);
    }
    if (planet.ring) {
      const ringGeometry = new THREE.RingGeometry(
        planet.ring.innerRadius,
        planet.ring.outerRadius,
        32
      );
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: planet.ring.texture,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = -0.5 * Math.PI;
      planetObj.add(ringMesh);
    }
    planetObj.receiveShadow = true;
    planetObj.position.x =
      Math.floor(Math.random() * 10) % 2 === 0
        ? planet.orbitRadius
        : -planet.orbitRadius;
    orbit.rotation.x = Math.PI / 2;
    planet3DObject.add(orbit, planetObj);
    solarSystem.add(planet3DObject);
    return { planet3DObject, planetObj };
  });
};

solarSystem.add(sun);
let planet3DObjects = createPlanets();
scene.add(solarSystem);

/**
 * Lights
 */
// ambient light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// sun light
const sunLight = new THREE.PointLight("#ff7046", 5, 300);
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
  30,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = -90;
camera.position.y = 140;
camera.position.z = 140;
camera.lookAt(0, 0, 0);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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
const worldPosition = new THREE.Vector3();
let index = 0;

window.addEventListener("load", () => {
  gsap.to(camera.position, {
    z: 10,
    duration: 3,
    delay: 3,
    onUpdate: () => {
        camera.lookAt(0, 0, sun.position.z + 30);
    },
  });
});


const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  console.log(elapsedTime );

  // rotate sun
  sun.rotation.y = -Math.PI * (elapsedTime / 10);

  // rotate planets
  planet3DObjects.forEach((planet, index) => {
    planet.planetObj.rotateY(planets[index].rotationMesh);
    planet.planet3DObject.rotateY(planets[index].rotationObj);
  });  
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
