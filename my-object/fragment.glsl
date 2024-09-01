varying float vDistance;
varying float vElevation;
varying float vInfluence;
void main() {
  
  vec3 color = vec3(0.34, 0.24, 0.96);
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  strength = pow(strength, 6.5);
  float elevationNormalized = (vElevation + 1.0) / 2.0;
  color = mix(color, vec3(1.0, 0.0, 0.0), elevationNormalized * 0.6);
  color = mix(vec3(0.0), color, strength);
  gl_FragColor = vec4(color, 0.09);


/*
 vec3 lowColor = vec3(0.0, 0.0, 1.0);  // Blue for lower elevation
  vec3 highColor = vec3(0.97, 0.70, 0.45); // Red for higher elevation


  float elevationNormalized = (vElevation + 12.0) / 2.0;

  // Interpolate between lowColor and highColor based on elevation
  vec3 color = mix(lowColor, highColor, elevationNormalized);

  gl_FragColor = vec4(color, 1.0);
*/
}