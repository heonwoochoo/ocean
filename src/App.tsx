import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, ThreeEvent, useFrame, Vector3 } from "@react-three/fiber";
import { Box, MapControls, OrbitControls, Sky, Stats } from "@react-three/drei";
import * as THREE from "three";
import Setting from "./Setting";
import Ocean from "./components/Ocean";
import Boat from "./components/Boat";
import Trash from "./components/Trash";
import PolarBear from "./components/PolarBear";
import Sand from "./components/Sand";
import Penguin from "./components/Penguin";
import Plastic from "./components/Plastic";
import TargetText from "./components/TargetText";
import { motion } from "framer-motion-3d";
import styled from "styled-components";
type PointTarget = "penguin" | "polar" | null;
type ClickTarget = "penguin" | "polar" | null;
const positionState = {
  penguin: new THREE.Vector3(-10, 1.5, 10),
  penguinClick: [-10, 10, 10] as Vector3,
  polar: new THREE.Vector3(10, 1.5, -10),
  polarClick: [10, 10, -10] as Vector3,
};

const variants = {
  rest: { scaleY: 1 },
  hover: { scaleY: 1.3, transition: { duration: 1 } },
};

const Btn = styled.button`
  position: absolute;
  top: 100px;
  width: 50px;
  height: 50px;
  z-index: 1;
`;

function App() {
  const sky = useRef<typeof Sky | any>(null);
  const [point, setPoint] = useState<Vector3>([0, 0, 0]);
  const [isMove, setIsMove] = useState<boolean>(false);
  const [pointTarget, setPointTarget] = useState<PointTarget>(null);
  const [clickTarget, setClickTarget] = useState<ClickTarget>(null);
  const [positions, setPositions] = useState(positionState);
  const clickedOcean = (e: ThreeEvent<MouseEvent>) => {
    setPoint(e.point);
    // setClickTarget(null);
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
  const penguinPointerEnter = (e: ThreeEvent<MouseEvent>) => {
    setPointTarget("penguin");
  };
  const penguinPointerLeave = (e: ThreeEvent<MouseEvent>) => {
    setPointTarget(null);
  };
  const polarPointerEnter = (e: ThreeEvent<MouseEvent>) => {
    setPointTarget("polar");
  };
  const polarPointerLeave = (e: ThreeEvent<MouseEvent>) => {
    setPointTarget(null);
  };
  const clickPolar = (e: ThreeEvent<MouseEvent>) => {
    console.log("폴라 클릭");
    setClickTarget("polar");
  };
  const clickPenguin = (e: ThreeEvent<MouseEvent>) => {
    console.log("펭귄 클릭");
    setClickTarget("penguin");
  };
  return (
    <>
      <Btn
        onClick={() => {
          setClickTarget(null);
        }}
      >
        target : null
      </Btn>
      <Canvas style={{ width: "100%", height: "100%" }} dpr={[1, 2]}>
        <Setting clickTarget={clickTarget} position={positions} />
        {clickTarget ? null : <MapControls />}
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
          <Trash position={[0, -1, 0]} scale={0.1} />
          <motion.group
            animate={pointTarget === "polar" ? "hover" : "rest"}
            variants={variants}
          >
            <PolarBear
              position={positions.polar}
              scale={0.03}
              onPointerEnter={polarPointerEnter}
              onPointerLeave={polarPointerLeave}
              onClick={clickPolar}
              userData={{ target: pointTarget }}
            />
          </motion.group>
          <Sand position={[-10, 1.5, 10]} scale={5} />
          <motion.group
            animate={pointTarget === "penguin" ? "hover" : "rest"}
            variants={variants}
          >
            <Penguin
              position={positions.penguin}
              scale={0.01}
              onPointerEnter={penguinPointerEnter}
              onPointerLeave={penguinPointerLeave}
              onClick={clickPenguin}
            />
          </motion.group>
          <Plastic position={[0, -1, 0]} scale={0.1} />
          <TargetText
            position={
              pointTarget === "polar"
                ? positions.polarClick
                : positions.penguinClick
            }
            userData={{ target: pointTarget }}
          />
          <Stats />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
