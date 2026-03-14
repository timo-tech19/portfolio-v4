"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Shift gradient center based on mouse
    vec2 center = vec2(0.5) + uMouse * 0.1;

    // Animated noise
    float noise1 = snoise(uv * 2.0 + uTime * 0.08);
    float noise2 = snoise(uv * 3.0 - uTime * 0.05);

    // Aurora-like gradient
    float gradient = smoothstep(0.0, 1.0, distance(uv, center) + noise1 * 0.15);

    // Color mixing: true black -> warm black -> subtle gold hints
    vec3 trueBlack = vec3(0.035, 0.035, 0.043); // #09090b
    vec3 warmBlack = vec3(0.067, 0.067, 0.075); // #111113
    vec3 gold = vec3(0.77, 0.66, 0.49) * 0.06;  // muted gold accent
    vec3 warmGray = vec3(0.60, 0.58, 0.55) * 0.04;

    vec3 color = mix(warmBlack, trueBlack, gradient);
    color += gold * smoothstep(0.6, 0.2, gradient + noise2 * 0.2);
    color += warmGray * smoothstep(0.7, 0.3, gradient - noise1 * 0.15);

    // Subtle vignette
    float vignette = 1.0 - smoothstep(0.3, 1.2, distance(uv, vec2(0.5)));
    color *= vignette * 0.5 + 0.5;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function ShaderBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    const mx = state.pointer.x;
    const my = state.pointer.y;
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mx, my),
      0.02
    );
  });

  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
      />
    </mesh>
  );
}
