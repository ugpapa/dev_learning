const objectSettings = [
  {
    name: "women1",
    position: {
      x: 300,
      y: 150,
      z: 330,
    },
    scale: {
      x: 4.5,
      y: 5,
      z: 5,
    },
    rotation: {
      x: 0,
      y: -Math.PI,
      z: 0,
    },
    t1: {
      x: 250,
      lookAt: {
        x: 250,
        y: 300,
        z: 138,
      },
    },
    t2: {
      z: 150,
      lookAt: {
        x: 250,
        y: 280,
        z: 200,
      },
    },
  },
  {
    name: "women2",
    position: {
      x: 70,
      y: 150,
      z: 360,
    },
    scale: {
      x: 1.5,
      y: 2,
      z: 2.5,
    },
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    },
    t1: {
      x: 50,
      lookAt: {
        x: 50,
        y: 300,
        z: 138,
      },
    },
    t2: {
      z: 150,
      lookAt: {
        x: 50,
        y: 280,
        z: 200,
      },
    },
  },
  {
    name: "women3",
    position: {
      x: -170,
      y: 150,
      z: 350,
    },
    scale: {
      x: 4.5,
      y: 5,
      z: 2.5,
    },
    rotation: {
      x: 0,
      y: Math.PI,
      z: 0,
    },
    t1: {
      x: -200,
      lookAt: {
        x: -200,
        y: 300,
        z: 138,
      },
    },
    t2: {
      z: 150,
      lookAt: {
        x: -200,
        y: 280,
        z: 200,
      },
    },
  },
  {
    name: "foldingScreen",
    position: {
      x: -300,
      y: 160,
      z: 70,
    },
    scale: {
      x: 30,
      y: 40,
      z: 10,
    },
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    },
    t1: {
      x: (-150 * Math.PI) / 2,
      lookAt: {
        x: -150 * Math.PI,
        y: 200,
        z: -70,
      },
    },
    t2: {
      z: -90,
      lookAt: {
        x: -150 * Math.PI,
        y: 280,
        z: 200,
      },
    },
  },
  {
    name: "food",
    position: {
      x: 0,
      y: 50,
      z: 30,
    },
    scale: {
      x: 8,
      y: 10,
      z: 10,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    t1: {
      x: 0,
      lookAt: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    t2: {
      z: 1,
      lookAt: {
        x: 0,
        y: 0,
        z: 2,
      },
    },
  },
];

const cameraSettings = {
  minDistance: 100,
  maxDistance: 550,
  minPolarAngle: Math.PI * 0.25,
  maxPolarAngle: Math.PI * 0.35,
  minAzimuthAngle: Math.PI * 0.25,
  maxAzimuthAngle: Math.PI * 0.75,
};

export { objectSettings, cameraSettings };
