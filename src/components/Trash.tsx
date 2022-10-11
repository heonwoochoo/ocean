import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Starbuckscup1_0: THREE.Mesh;
  };
  materials: {
    starbuckspapercup: THREE.MeshStandardMaterial;
  };
};

function Trash(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "assets/gltf/starbucks_paper_cup.glb"
  ) as GLTFResult | any;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[4.08, 3.78, 1.7]} rotation={[-0.27, 0.6, 1.93]} />
        <group position={[0, 1.78, 2.73]} scale={0.52}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Starbuckscup1_0.geometry}
            material={materials.starbuckspapercup}
          />
        </group>
        <group
          position={[-4.82, 3.82, 14.94]}
          rotation={[-0.24, -0.42, 1.63]}
        />
        <group position={[-3.83, -8.46, 6.69]} rotation={[1.07, -0.26, -1.9]} />
        <group position={[-5.61, -1.89, 2.79]} rotation={[-0.27, 0.6, 1.93]} />
        <group position={[6.63, -5.97, 5.03]} rotation={[1.11, 0.81, -1.51]} />
      </group>
    </group>
  );
}
export default Trash;
useGLTF.preload("/starbucks_paper_cup.glb");
