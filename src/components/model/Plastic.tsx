import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useSetRandomPosition from "../../hooks/useSetRandomPosition";
import useRemovePlastic from "../../hooks/useRemovePlastic";
import useDrop from "../../hooks/useDrop";
type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
  };
  materials: {
    Bottle: THREE.MeshStandardMaterial;
    Cover: THREE.MeshStandardMaterial;
    Brand: THREE.MeshStandardMaterial;
  };
};

function Plastic(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/assets/gltf/lowpolly_water_bottle.glb"
  ) as GLTFResult | any;
  const plastic = useRef<THREE.Group>(null);
  const positions = useSetRandomPosition(600, plastic);
  useRemovePlastic(plastic);
  useDrop(500, plastic);
  return (
    <group ref={plastic} {...props} dispose={null}>
      {positions.map((position, i) => (
        <group position={position} key={i}>
          <mesh geometry={nodes.Object_5.geometry} material={materials.Botle} />
          <mesh geometry={nodes.Object_4.geometry} material={materials.Cover} />
          <mesh geometry={nodes.Object_6.geometry} material={materials.Brand} />
        </group>
      ))}
    </group>
  );
}

export default Plastic;

useGLTF.preload("/assets/gltf/lowpolly_water_bottle.glb");
