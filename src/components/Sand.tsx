import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["TextureAtlas_0.001"]: THREE.MeshStandardMaterial;
  };
};

function Sand(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "assets/gltf/sandlanshaft_17k_face.glb"
  ) as GLTFResult | any;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials["TextureAtlas_0.001"]}
        />
      </group>
    </group>
  );
}

export default Sand;

useGLTF.preload("assets/gltf/sandlanshaft_17k_face.glb");
