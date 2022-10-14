import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

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
    "assets/gltf/lowpolly_water_bottle.glb"
  ) as GLTFResult | any;
  const positions = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < 50; i++) {
      arr.push(
        new THREE.Vector3(
          Math.random() * 600 - 300,
          Math.random() * 500,
          Math.random() * 600 - 300
        )
      );
    }
    return arr;
  }, []);
  const plastic = useRef<THREE.Group>(null);
  useEffect(() => {
    plastic.current?.children.forEach((item) => {
      item.rotation.set(Math.random(), Math.random(), Math.random(), "XYZ");
    });
  }, []);
  useFrame(() => {
    plastic.current?.children.forEach((item) => {
      if (item.position.y < 0) item.position.y = 500;
      item.position.y -= 1;
    });
  });
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

useGLTF.preload("assets/gltf/lowpolly_water_bottle.glb");
