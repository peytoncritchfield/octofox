uniform float uTime;

void main() 
{
    float i = sin(uTime) * 3.0; 

    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.05 * (sin(uTime) * 2.0 + 4.0);

    float level = 13.0;

    float flash = abs(sin(uTime * 10.0));

    if (uTime < level) {
        strength = 0.0;
    } else if (uTime > (level + 2.0) && uTime < (level + 2.5)) {
        if(flash > 0.99) {
            strength = 0.0;
        }
    } else if (uTime > (level + 2.5) && uTime < (level + 3.0)) {
        if(flash > 0.90) {
            strength = 0.0;
        }
    }

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}