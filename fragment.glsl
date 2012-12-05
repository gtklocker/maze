#pragma optimize(off)
precision highp float;

varying vec3 vColor;

varying vec3 vPosition;
varying vec3 vNormal;

varying vec2 vUV;
uniform sampler2D uSampler;

void main() {
    vec3 fPosition = normalize( vPosition );
    vec3 fNormal = normalize( vNormal );
    vec3 vLight = -fPosition;
    vec3 vCamera = normalize( vec3( 0.0, 0.0, 0.0 ) - fPosition );

    vec3 ambientMaterial = vec3( 0.0, 0.0, 0.0 );
    vec3 ambient = ambientMaterial;

    float diffuseIntensity = abs( dot( fNormal, vLight ) );
    vec3 diffuseLight = vec3( 1.0, 1.0, 1.0 );
    vec3 diffuseMaterial = vec3( 0.7, 0.8, 0.8 );
    vec3 diffuse = diffuseIntensity * diffuseLight * diffuseMaterial;

    float specularIntensity = max( dot( vCamera, reflect( -vLight, fNormal ) ), 0.0 );
    float specularShininess = 5.0;
    vec3 specularLight = vec3( 1.0, 1.0, 1.0 );
    vec3 specularMaterial = vec3( 1.0, 1.0, 1.0 );
    vec3 specular = pow( specularIntensity, specularShininess ) * specularLight * specularMaterial;

    //gl_FragColor = vec4( vColor * diffuse + specular, 1.0 );
    gl_FragColor = texture2D( uSampler, vUV );
}
