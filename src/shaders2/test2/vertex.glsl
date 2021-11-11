uniform float uTime;

varying vec2 vUv;
varying vec4 vModelPosition;

void main() 
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float x = modelPosition.x;
    float y = modelPosition.y;
    float z = modelPosition.z;
    

    // y *= 8.0;

    if(y < 1.75) {
        z += sin(y * 2.0 - uTime * 1.5) * y;
        x += cos(y * 2.0 - uTime) * y;
        y *= 8.0;
    } else {
        x = 5.0 * y;
        z = 5.0 * y;
        z += sin(y * 2.0 - uTime * 1.5) * y;
        x += cos(y * 2.0 - uTime) * y;
        y += 13.0;
    }

    z -= y;


    modelPosition.xyz = vec3(x, y, z);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
    vModelPosition = modelPosition;
}