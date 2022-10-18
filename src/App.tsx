import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, ThreeEvent, Vector3 } from "@react-three/fiber";
import { MapControls, Sky, Stats } from "@react-three/drei";
import * as THREE from "three";
import Setting from "./Setting";
import Ocean from "./components/model/Ocean";
import Boat from "./components/model/Boat";
import Trash from "./components/model/Trash";
import PolarBear from "./components/model/PolarBear";
import Sand from "./components/model/Sand";
import Penguin from "./components/model/Penguin";
import Plastic from "./components/model/Plastic";
import TargetText from "./components/text/TargetText";
import { motion } from "framer-motion-3d";
import styled from "styled-components";
import OceanText from "./components/text/OceanText";
import PenguinText from "./components/text/PenguinText";
import PenguinImages from "./components/img/PenguinImages";
import Overlay from "./components/model/Overlay";
import { useRecoilState } from "recoil";
import { textAnimationFinish } from "./atoms";
type PointTarget = "penguin" | "polar" | null;
type ClickTarget = "penguin" | "polar" | null;

const positionState = {
  penguin: new THREE.Vector3(-10, 0.7, 10),
  penguinClick: [-10, 10, 10] as Vector3,
  polar: new THREE.Vector3(10, 1.5, -10),
  polarClick: [10, 10, -10] as Vector3,
};

const variants = {
  rest: { scaleY: 1 },
  hover: { scaleY: 1.3, transition: { duration: 1 } },
};

const BackBtn = styled.svg`
  position: absolute;
  fill: #2f3542;
  top: 90%;
  left: 5%;
  width: 50px;
  height: 50px;
  z-index: 2;
  :hover {
    fill: #a4b0be;
    transition: 0.5s;
  }
`;

function App() {
  const sky = useRef<typeof Sky | any>(null);
  const [point, setPoint] = useState<Vector3>([0, 0, 0]);
  const [pointTarget, setPointTarget] = useState<PointTarget>(null);
  const [clickTarget, setClickTarget] = useState<ClickTarget>(null);
  const [positions, setPositions] = useState(positionState);
  const [textAniEnd, setTextAniEnd] = useRecoilState(textAnimationFinish);
  const clickedOcean = (e: ThreeEvent<MouseEvent>) => {
    if (clickTarget) return;
    setPoint(e.point);
    // setClickTarget(null);
  };
  const penguinPointerEnter = (e: ThreeEvent<MouseEvent>) => {
    if (clickTarget) return;
    setPointTarget("penguin");
  };
  const penguinPointerLeave = (e: ThreeEvent<MouseEvent>) => {
    setPointTarget(null);
  };
  const polarPointerEnter = (e: ThreeEvent<MouseEvent>) => {
    if (clickTarget) return;
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
  console.log(textAniEnd);
  return (
    <>
      {textAniEnd ? (
        <BackBtn
          onClick={() => {
            setClickTarget(null);
            setTextAniEnd(false);
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512s256-114.6 256-256zM215 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L392 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-214.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L103 273c-9.4-9.4-9.4-24.6 0-33.9L215 127z" />
        </BackBtn>
      ) : null}
      {clickTarget === "penguin" ? <PenguinText /> : null}
      <Canvas style={{ width: "100%", height: "100%" }} dpr={[1, 2]}>
        <Setting clickTarget={clickTarget} position={positions} />
        <MapControls enabled={clickTarget ? false : true} />
        <primitive object={new THREE.AxesHelper(10)} />
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
          <Ocean onClick={clickedOcean} />
          <Boat
            position={[0, 0.1, 0]}
            scale={0.02}
            userData={{ point, clickTarget }}
          />
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
            />
          </motion.group>
          <Sand position={[-10, 0.3, 10]} scale={5} />
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
          <PenguinImages userData={{ target: clickTarget }} />
          <Plastic position={[0, -1, 0]} scale={0.1} />
          <TargetText
            position={
              pointTarget === "polar"
                ? positions.polarClick
                : positions.penguinClick
            }
            userData={{ target: pointTarget }}
          />
          <OceanText />
          <Overlay userData={{ target: clickTarget, position: positions }} />
          <Stats />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
