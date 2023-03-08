precision mediump float;

uniform sampler2D uTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vRandom;
varying vec2 vFrequency;
varying float vTime;
varying float vResolution;
varying float vElevation;

float Cir (vec2 uv, float r, bool blur, float R) {
    float a = blur ? 0.01 : 0.;
    float b = blur ? 0.13 : 5./R;
    return smoothstep(a, b, length(uv)-r);
}

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.5;
    gl_FragColor = textureColor;
}