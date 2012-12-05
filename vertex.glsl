precision mediump float;

varying vec3 vColor;

attribute vec3 aPosition;
varying vec3 vPosition;

attribute vec3 aNormal;
varying vec3 vNormal;

attribute vec2 aUV;
varying vec2 vUV;

uniform mat4 uModelView;
uniform mat4 uProjection;

vec4 colorize( vec4 vec ) {
    return vec4( ( vec.xyz + 1.0 ) / 2.0, 1.0 );
}

void main() {
    // We assume w = 1.0 for our position.
    vec4 fPosition = vec4( aPosition, 1.0 );
    // TODO: Normal shouldn't need to be negated.
    vec4 fNormal = uModelView * vec4( -aNormal, 0.0 );

    gl_Position = uProjection * uModelView * fPosition;

    vColor = vec3( 0.7, 0.0, 0.0 );
    
    vPosition = ( uModelView * fPosition ).xyz;
    vNormal = fNormal.xyz;
    vUV = aUV;
}
