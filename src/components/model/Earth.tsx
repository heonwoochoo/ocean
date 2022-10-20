import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { motion } from "framer-motion-3d";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRecoilState, useSetRecoilState } from "recoil";
import { clickedEarthState, mouseOnEarthState } from "../../atoms";
import { AnimatePresence } from "framer-motion";

type GLTFResult = GLTF & {
  nodes: {
    earth_Earth_0: THREE.Mesh;
  };
  materials: {
    Earth: THREE.MeshStandardMaterial;
  };
};

const variants = {
  init: { scale: 0.8 },
  visible: { scale: 1 },
  end: { scale: 3, y: 20, opacity: 0 },
};

function Earth(props: JSX.IntrinsicElements["group"]) {
  const [clickedEarth, setClickedEarth] = useRecoilState(clickedEarthState);
  const setMouseOnEarth = useSetRecoilState(mouseOnEarthState);
  const { nodes, materials } = useGLTF(
    "assets/gltf/ps1_style_low_poly_earth.glb"
  ) as GLTFResult | any;
  const earth = useRef<THREE.Group>(null);
  const handleEarthClick = (e: ThreeEvent<MouseEvent>) => {
    setClickedEarth(true);
  };

  // 지구의 자전
  useFrame(({ clock }) => {
    if (clickedEarth === false) {
      const time = clock.getElapsedTime() * 0.1;
      earth.current?.rotation.set(0, time, 0);
    }
  });
  const handlePointerEnter = () => setMouseOnEarth(true);
  const handlePointerLeave = () => setMouseOnEarth(false);
  return (
    <group
      {...props}
      ref={earth}
      dispose={null}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1}
      onClick={handleEarthClick}
    >
      <AnimatePresence>
        {!clickedEarth ? (
          <motion.mesh
            variants={variants}
            whileHover={{ scale: 1.3 }}
            geometry={nodes.earth_Earth_0.geometry}
            material={materials.Earth}
            initial="init"
            animate="visible"
            exit="end"
            transition={{ duration: 2 }}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
          />
        ) : null}
      </AnimatePresence>
    </group>
  );
}

export default Earth;

useGLTF.preload("assets/gltf/ps1_style_low_poly_earth.glb");
