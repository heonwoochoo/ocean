import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, ThreeEvent, useFrame, Vector3 } from "@react-three/fiber";
import { Box, OrbitControls, Sky } from "@react-three/drei";
import * as THREE from "three";
import Setting from "./Setting";
import Ocean from "./components/Ocean";
import Boat from "./components/Boat";

function App() {
  const sky = useRef<typeof Sky | any>(null);
  const [point, setPoint] = useState<Vector3>([0, 0, 0]);
  const [isMove, setIsMove] = useState<boolean>(false);
  const clickedOcean = (e: ThreeEvent<MouseEvent>) => {
    setPoint(e.point);
  };
  const pointerDown = () => {
    setIsMove(true);
  };
  const pointerUp = () => {
    setIsMove(false);
  };
  const pointerMove = (e: ThreeEvent<MouseEvent>) => {
    isMove && setPoint(e.point);
  };
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <Setting />
      {/* <OrbitControls /> */}
      <ambientLight />
      <Suspense fallback={null}>
        <Sky
          ref={sky}
          turbidity={10}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
          sunPosition={[1200, 10, -1200]}
          azimuth={90}
        />
        <Ocean
          onClick={clickedOcean}
          onPointerUp={pointerUp}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
        />
        <Boat position={[0, 0.1, 0]} scale={0.02} userData={{ point }} />
      </Suspense>
    </Canvas>
  );
}

export default App;
