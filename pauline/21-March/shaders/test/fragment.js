// only in raw shader
// precision mediump float;
const testFragmentShader = `
uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;

void main(){
    // r, g,b and a (alpha) --> have to set the variables "transparent" to true in the material to activate the alpha
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.9;
    // gl_FragColor = vec4(uColor, 1.0);
    gl_FragColor = textureColor;
}
`;
export default testFragmentShader;
