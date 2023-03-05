import * as THREE from "three";
import { OrbitControls } from "control";
import {
  planets,
  milkywayColorTexture,
  sunColorTexture,
  sizes,
  moonColorTexture,
  textLoader,
  matcapTexture,
} from "./constant.js";
import { gsap } from "gsap";
import { TextGeometry } from "textGeometry";

/**
 * Base
 */
// Debug
let isManual = false;
const GUI = lil.GUI;
const gui = new GUI();
var parameters = {
  count: 3000, // number of total particles
  size: 1.5, // particles size
  radius: planets[6].orbitRadius + 30,
  branches: 10,
  spin: 5,
  randomNess: 0.2,
  randomNessPow: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};

parameters.manualControl = () => {
  isManual = !isManual;
};

gui.add(parameters, "manualControl").name("Manual Control");

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

let particleGeometry = null;
let particleMaterial = null;
let particles = null;

const generateGalaxy = () => {
  /**
   * Destroy old galaxy
   */
  // avoid memory leaks
  if (particles !== null) {
    particleGeometry.dispose(); // free the memory from the GPU
    particleMaterial.dispose();
    scene.remove(particles);
  }

  /**
   * Geometry
   */
  particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < positions.length; i++) {
    const index3D = i * 3;
    const radius = Math.random() * parameters.radius;
    // bigger number multiple with pi will get curvier spin
    const spinAngle = radius * parameters.spin;
    // divide the circle into 3 points and multiple with pi
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    // make it have a lot of particles nearer
    const randomX =
      Math.pow(Math.random(), parameters.randomNessPow) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameters.randomNessPow) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameters.randomNessPow) *
      (Math.random() < 0.5 ? 1 : -1);

    positions[index3D + 0] =
      Math.cos(branchAngle + spinAngle) * radius + randomX; // x
    positions[index3D + 1] = randomY; // y
    positions[index3D + 2] =
      Math.sin(branchAngle + spinAngle) * radius + randomZ; // z

    /**
     * Color
     */
    // lerp will change the color of the original value --> need to clone it first
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);
    colors[index3D] = mixedColor.r; // Red
    colors[index3D + 1] = mixedColor.g; // Green
    colors[index3D + 2] = mixedColor.b; // Blue
  }
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  /**
   * Materials
   */
  particleMaterial = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  /**
   * Points
   */
  particles = new THREE.Points(particleGeometry, particleMaterial);
  particles.position.y = -5;
  const object = new THREE.Object3D();
  object.add(particles);
  solarSystem.add(object);
};
generateGalaxy();

gui
  .add(parameters, "count")
  .min(100)
  .max(10000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "branches")
  .min(3)
  .max(25)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "spin")
  .min(-20)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomNess")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomNessPow")
  .min(0)
  .max(5)
  .step(1)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

// create planet text
const createPlanetText = (planetName, planetObj) => {
  textLoader.load(
    "./resources/fonts/helvetiker_regular.typeface.json",
    (font) => {
      const textGeometry = new TextGeometry(planetName, {
        font,
        size: 4,
        height: 1,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.004,
        bevelOffset: -0.1,
        bevelSegments: 5,
      });
      textGeometry.center();
      const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
      const textMesh = new THREE.Mesh(textGeometry, material);
      planetName === "earth"
        ? (textMesh.position.x = 20)
        : planetName === "uranus" || planetName === "saturn"
        ? (textMesh.position.x = 25)
        : (textMesh.position.x = 15);
      planetObj.add(textMesh);
    }
  );
};

// create planets
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
    createPlanetText(planet.name, planetObj);
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

const changePlanetView = (elapsedTime) => {
  if (Math.round(elapsedTime) % 5 === 0) {
    const worldPosition = new THREE.Vector3();
    const delayTime = Math.round(elapsedTime / 5);
    if (delayTime < 7) {
      const { x, y, z } =
        planet3DObjects[delayTime].planetObj.getWorldPosition(worldPosition);
      camera.position.x = x + 30;
      camera.position.y = y + 20;
      camera.position.z = z + 50;
      camera.lookAt(planet3DObjects[delayTime].planetObj.position);
      planet3DObjects[delayTime].planetObj.add(camera);
    } else {
      isManual = true;
      gsap.to(camera.position, {
        y: 30,
        z: 10,
        duration: 3,
        delay: 3,
        onUpdate: () => {
          camera.lookAt(0, 0, sun.position.z + 30);
        },
      });
    }
  }
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // rotate sun
  sun.rotation.y = -Math.PI * (elapsedTime / 10);

  // rotate planets
  planet3DObjects.forEach((planet, index) => {
    planet.planetObj.rotateY(planets[index].rotationMesh);
    planet.planet3DObject.rotateY(planets[index].rotationObj);
  });

  //   planet introduction
  if (!isManual) {
    changePlanetView(elapsedTime);
  }

  // Update controls
  if (isManual) {
    controls.update();
    scene.add(camera);
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
