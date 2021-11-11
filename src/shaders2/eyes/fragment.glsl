uniform float uTime;

void main() 
{    
    float alpha = 1.0;

    float level = 13.0;

    float flash = abs(sin(uTime * 10.0));

    if (uTime < level) {
        alpha = 0.0;
    } else if (uTime > (level + 2.0) && uTime < (level + 2.5)) {
        if(flash > 0.99) {
            alpha = 0.0;
        }
    } else if (uTime > (level + 2.5) && uTime < (level + 3.0)) {
        if(flash > 0.90) {
            alpha = 0.0;
        }
    }

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}