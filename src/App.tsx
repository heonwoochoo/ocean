import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Sky } from "@react-three/drei";
import * as THREE from "three";
import Setting from "./Setting";
import Ocean from "./components/Ocean";
import Boat from "./components/Boat";

function App() {
  const mesh = useRef<THREE.Mesh>(null);
  const sky = useRef<typeof Sky | any>(null);
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <Setting />
      <OrbitControls />
      <ambientLight />
      <Suspense fallback={null}>
        <Sky
          ref={sky}
          turbidity={10}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          sunPosition={[500, 1, -500]}
          azimuth={90}
        />
        <Ocean />
        <Boat position={[0, 0.1, 0]} scale={0.02} />
      </Suspense>
    </Canvas>
  );
}

export default App;
