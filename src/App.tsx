import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Sky } from "@react-three/drei";
import * as THREE from "three";
import Setting from "./Setting";
import { Water } from "three-stdlib";
import Ocean from "./components/Ocean";

function App() {
  const mesh = useRef<THREE.Mesh>(null);

  const sky = useRef<typeof Sky>(null);
  useEffect(() => {
    console.log(sky);
    // console.log(water.material.uniforms);
  }, []);
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
        />
        <Ocean />
        <mesh ref={mesh} position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial color="green" />
        </mesh>
      </Suspense>
    </Canvas>
  );
}

export default App;
