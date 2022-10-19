import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { motion } from "framer-motion-3d";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRecoilState } from "recoil";
import { clickedEarthState } from "../../atoms";

type GLTFResult = GLTF & {
  nodes: {
    earth_Earth_0: THREE.Mesh;
  };
  materials: {
    Earth: THREE.MeshStandardMaterial;
  };
};

function Earth(props: JSX.IntrinsicElements["group"]) {
  const [clickedEarth, setClickedEarth] = useRecoilState(clickedEarthState);
  const { nodes, materials } = useGLTF(
    "assets/gltf/ps1_style_low_poly_earth.glb"
  ) as GLTFResult | any;
  const earth = useRef<THREE.Group>(null);
  useEffect(() => {
    console.log(clickedEarth);
  }, [clickedEarth]);
  const handleEarthClick = (e: ThreeEvent<MouseEvent>) => {
    setClickedEarth(true);
  };
  useFrame(({ clock }) => {
    if (clickedEarth === false) {
      const time = clock.getElapsedTime() * 0.1;
      earth.current?.rotation.set(0, time, 0);
    }
  });
  return (
    <group
      {...props}
      ref={earth}
      dispose={null}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1}
      visible={clickedEarth ? false : true}
      onClick={handleEarthClick}
    >
      <motion.mesh
        whileHover={{ scale: 1.1 }}
        geometry={nodes.earth_Earth_0.geometry}
        material={materials.Earth}
      />
    </group>
  );
}

export default Earth;

useGLTF.preload("assets/gltf/ps1_style_low_poly_earth.glb");
