uniform float uTime;


varying vec2 vUv;
varying vec4 vModelPosition;

void main() 
{
    float y = vModelPosition.y / 1.0;
    float x = vModelPosition.x / 3.0;
    float z = vModelPosition.z / 10.0;

    
//xyz
    //classy black-grey-white
    gl_FragColor = vec4(x - 3.0, x - 3.0, x - 3.0, -y + uTime);
}