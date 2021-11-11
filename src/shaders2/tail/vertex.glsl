uniform float index;
uniform float uTime;

varying vec4 vPosition;
varying vec2 vUv;

void main() 
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float x = modelPosition.x;
    float y = modelPosition.y;
    float z = modelPosition.z;
    
    if (index == 0.0) {
        // if (y < 1.75) {
            x += cos(y * 2.0 - uTime) * y * y;
            z += sin(y * 2.0 - uTime * 1.5) * y;
            y *= 13.0;
        // } else {
        //     x = -1.0 * y;
        //     z = -0.75 * y;
        //     x += cos(y * 2.0 - uTime) * y * y;
        //     z += sin(y * 2.0 - uTime * 1.5) * y;
        //     y += 13.0;
        // }
        z -= y;
    } else if (index == 1.0) {
        // if (y < 1.75) {
            x += cos(y * 2.0 - uTime * 2.0) * y * y;
            z += sin(y * 2.0 - uTime / 1.5) * y * 1.5;
            y *= 15.0;
        // } else {
        //     x = -1.0 * y;
        //     z = -0.375 * y;
        //     x += cos(y * 2.0 - uTime * 2.0) * y * y;
        //     z += sin(y * 2.0 - uTime / 1.5) * y * 1.5;
        //     y += 16.0;
        // }
        z -= y/2.0;
    } else if (index == 2.0) {
        z += sin(y * 2.0 - uTime / 1.5) * y * 2.0;
        x += cos(y * 2.0 - uTime * 1.25) * y * y;
        y *= 17.0;
    } else if (index == 3.0 ) {
        z += sin(y * 2.0 - uTime / 1.5) * y * 1.5;
        x += cos(y * 2.0 - uTime * 2.0) * y * y;
        y *= 15.0;
        z += y/2.0;
    } else if (index == 4.0 ) {
        z += sin(y * 2.0 - uTime * 1.5) * y;
        x += cos(y * 2.0 - uTime) * y * y;
        y *= 13.0;
        z += y;
    }

    modelPosition.xyz = vec3(x, y, z);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vPosition = modelPosition;
    vUv = uv;
}