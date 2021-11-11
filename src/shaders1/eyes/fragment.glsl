uniform float uTime;
uniform float uReactiveLength;

void main() 
{    
    float alpha = 0.0;

    if (uReactiveLength > 47.0) {
        alpha = 1.0;
    }

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}