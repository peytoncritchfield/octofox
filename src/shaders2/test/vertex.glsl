void main() 
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float x = modelPosition.x;
    float y = modelPosition.y;
    float z = modelPosition.z;
    
    y += sin(y);

    modelPosition.xyz = vec3(x, y, z);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
}