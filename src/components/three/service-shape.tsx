"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ServiceShapeProps {
  activeIndex: number;
}

const SHAPE_CONFIGS = [
  { distort: 0.3, speed: 2, scale: 2.2, color: "#c4a97d" },
  { distort: 0.5, speed: 3, scale: 2.0, color: "#d4bc94" },
  { distort: 0.2, speed: 1.5, scale: 1.8, color: "#b09570" },
  { distort: 0.6, speed: 4, scale: 2.4, color: "#c4a97d" },
];

export default function ServiceShape({ activeIndex }: ServiceShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const targetConfig = SHAPE_CONFIGS[activeIndex] || SHAPE_CONFIGS[0];

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[targetConfig.scale, 4]} />
      <MeshDistortMaterial
        color={targetConfig.color}
        wireframe
        distort={targetConfig.distort}
        speed={targetConfig.speed}
        roughness={0}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}
