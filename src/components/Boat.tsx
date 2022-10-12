import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame, useThree } from "@react-three/fiber";
import { distance, value } from "../utils/helper";

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
      1,
      props.userData?.point["z"] || 0
    );
    console.log(boat.current);
  }, [props.userData?.point]);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 5;
    const destinationX = props.userData?.point["x"];
    const destinationZ = props.userData?.point["z"];
    const targetX = boat.current?.position.x || 0;
    const targetZ = boat.current?.position.z || 0;
    if (distance(destinationX, targetX, destinationZ, targetZ) > 0.003) {
      boat.current?.position.set(
        targetX + (destinationX - targetX) * 0.005,
        Math.cos(time) * 0.2 + 0.4,
        targetZ + (destinationZ - targetZ) * 0.005
      );
    }
  });

  const mesh = useMemo(() => {
    return new THREE.Mesh(
      nodes.Object_2.geometry,
      materials.IND_WoodenBoat_01_SM
    );
  }, []);
  return (
    <group {...props} ref={boat} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={mesh} />
      </group>
    </group>
  );
}

export default Boat;

useGLTF.preload("assets/gltf/wooden_boat.glb/wooden_boat.glb");
