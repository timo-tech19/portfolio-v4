"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 500;

const vertexShader = `
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Gentle floating motion
    pos.y += sin(uTime * 0.3 + position.x * 0.5) * 0.2;
    pos.x += cos(uTime * 0.2 + position.z * 0.3) * 0.15;

    // Mouse repulsion
    vec2 toMouse = pos.xy - uMouse * 5.0;
    float dist = length(toMouse);
    float repulsion = smoothstep(3.0, 0.0, dist) * 0.8;
    pos.xy += normalize(toMouse) * repulsion;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * (50.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    // Fade based on distance from camera
    vAlpha = smoothstep(30.0, 5.0, -mvPosition.z) * 0.25;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circular particle shape with soft edge
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function Particles() {
  const meshRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const { positions, scales, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const goldColor = new THREE.Color("#c4a97d");
    const warmWhite = new THREE.Color("#e8e0d4");
    const warmGray = new THREE.Color("#9a9590");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles in a wide area
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      scales[i] = Math.random() * 2 + 0.3;

      // Random color between gold, warm white, and warm gray
      const colorChoice = Math.random();
      const color =
        colorChoice < 0.4
          ? goldColor
          : colorChoice < 0.7
          ? warmWhite
          : warmGray;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, scales, colors };
  }, []);

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mouse tracking
    const targetX = state.pointer.x;
    const targetY = state.pointer.y;
    mouseRef.current.x += (targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (targetY - mouseRef.current.y) * 0.05;
    materialRef.current.uniforms.uMouse.value.set(
      mouseRef.current.x,
      mouseRef.current.y
    );
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
