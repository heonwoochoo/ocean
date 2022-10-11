import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    IND_WoodenBoat_01_SM: THREE.MeshStandardMaterial;
  };
};

function Boat(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("assets/gltf/wooden_boat.glb") as
    | GLTFResult
    | any;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.IND_WoodenBoat_01_SM}
        />
      </group>
    </group>
  );
}

export default Boat;

useGLTF.preload("assets/gltf/wooden_boat.glb/wooden_boat.glb");
