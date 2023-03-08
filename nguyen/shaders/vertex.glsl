uniform vec2 uFrequency;
uniform float uTime;
uniform float uResolution;
attribute float aRandom;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vRandom;
varying vec2 vFrequency;
varying float vTime;
varying float vResolution;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    vPosition = modelPosition.xyz;
    vElevation = elevation;
    vUv = uv;
    vRandom = aRandom;
    vTime = uTime;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}