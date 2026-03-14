"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";
import { ShaderBackground } from "./shader-background";

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      <Suspense fallback={null}>
        <ShaderBackground />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
