import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

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
  const boat = useRef<THREE.Group>(null);
  useEffect(() => {
    boat.current?.lookAt(
      props.userData?.point["x"] || -Math.PI / 2,
      0,
      props.userData?.point["z"] || 0
    );
  }, [props.userData?.point]);

  return (
    <group {...props} ref={boat} dispose={null}>
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
