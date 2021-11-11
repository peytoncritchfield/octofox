uniform float uTime;
uniform float uReactiveLength;

varying vec4 vPosition;
varying vec2 vUv;


void main() 
{
    float y = vPosition.y / 1.0;
    float x = vPosition.x / 23.0;
    float z = vPosition.z / 10.0;

    float manipulation = (-y - 22.0 + uReactiveLength);

    
//xyz
    //classy black-grey-white
    gl_FragColor = vec4(x + 0.5, x + 0.5, x + 0.5, manipulation);
    // purple - white
    // gl_FragColor = vec4(x + 0.5, x * 5.0, x + 0.75, 1.0);
    // blue - white
    // gl_FragColor = vec4(x * 5.0, x + 0.5, x + 0.75, 1.0);
    // red - white
    // gl_FragColor = vec4(x + 0.85, x + 0.25, x * 2.0,  1.0);
    // fire
    // gl_FragColor = vec4(x + 0.85 + y, x + 0.85, x * 2.0,  1.0);


// uv
    // gl_FragColor = vec4(sin(vUv.x * 3.0) - 0.25, sin(vUv.x * 3.0) * vUv.y, sin(vUv.x * 3.0) - 0.25,  1.0);
}