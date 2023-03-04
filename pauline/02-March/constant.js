import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

// earth texture
const earthColorTexture = textureLoader.load(
  "./resources/textures/earth/2k_earth.jpg"
);
const earthNightTexture = textureLoader.load(
  "./resources/textures/earth/earth_nightmap.jpg"
);
const earthCloudTexture = textureLoader.load(
  "./resources/textures/earth/earth_clouds.jpg"
);
const earthNormalTexture = textureLoader.load(
  "./resources/textures/earth/earth_normal_map.tif"
);
const earthRoughnessTexture = textureLoader.load(
  "./resources/textures/earth/2k_earth_specular_map.tif"
);

// sun texture
const sunColorTexture = textureLoader.load(
  "./resources/textures/sun/2k_sun.jpg"
);

// mars texture
const marsColorTexture = textureLoader.load(
  "./resources/textures/mars/2k_mars.jpg"
);

// moon texture
const moonColorTexture = textureLoader.load(
  "./resources/textures/moon/2k_moon.jpg"
);

// mercury texture
const mercuryColorTexture = textureLoader.load(
  "./resources/textures/mercury/2k_mercury.jpg"
);

// jupiter texture
const jupiterColorTexture = textureLoader.load(
  "./resources/textures/jupiter/2k_jupiter.jpg"
);

// uranus texture
const uranusColorTexture = textureLoader.load(
  "./resources/textures/uranus/2k_uranus.jpg"
);

// neptune texture
const neptuneColorTexture = textureLoader.load(
  "./resources/textures/neptune/2k_neptune.jpg"
);

// saturn texture
const saturnColorTexture = textureLoader.load(
  "./resources/textures/saturn/2k_saturn.jpg"
);
const saturnAlphaTexture = textureLoader.load(
  "./resources/textures/saturn/2k_saturn_ring_alpha.png"
);

// venus texture
const venusColorTexture = textureLoader.load(
  "./resources/textures/venus/2k_venus_surface.jpg"
);
const venusCloudTexture = textureLoader.load(
  "./resources/textures/venus/2k_venus_surface.jpg"
);

// milkyway texture
const cubeTextureLoader = new THREE.CubeTextureLoader();
const starsTexture = "./resources/textures/background/2k_stars_milky_way.jpg"
const milkywayColorTexture = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

// planets
const planets = [
  { name: "mercury", texture: mercuryColorTexture, orbitRadius: 30, radius: 3 },
  { name: "venus", texture: venusColorTexture, orbitRadius: 60, radius: 3 },
  { name: "mars", texture: marsColorTexture, orbitRadius: 70, radius: 3 },
  {
    name: "earth",
    texture: earthColorTexture,
    orbitRadius: 80,
    radius: 3,
  },
  { name: "moon", texture: moonColorTexture, orbitRadius: 40, radius: 1.5 },
  { name: "jupiter", texture: jupiterColorTexture, orbitRadius: 50, radius: 5 },
  { name: "saturn", texture: saturnColorTexture, orbitRadius: 150, radius: 5 },
  { name: "uranus", texture: uranusColorTexture, orbitRadius: 200, radius: 5 },
];

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export { planets, milkywayColorTexture, sunColorTexture, sizes };
