// will finally transform our coordinates into the final clip space coordinates.
// uniform mat4 projectionMatrix;
// apply transformation to the CAMERA, 
// rotate the camera to the left --> the vertices on the right
// If we move the camera in direction of the Mesh, the vertices should get bigger
// uniform mat4 viewMatrix;
// apply transformation to the MESH
// scale, rotate or move the Mesh --> will be applied in the position 
// uniform mat4 modelMatrix; 

const testVertexShader = `
uniform vec2 uFrequency;
uniform float uTime;

// attribute vec3 position;
// attribute vec2 uv;

varying vec2 vUv;
varying float vElevation;

void main(){
    // multiply to apply the matrix
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    
    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    vUv = uv;
    vElevation = elevation;

}
`;
export default testVertexShader;
