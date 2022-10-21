import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRecoilValue } from "recoil";
import { clickedEarthState } from "../../atoms";
import useHideBoat from "../../hooks/useHideBoat";
import useMoveBoat from "../../hooks/useMoveBoat";
import useSetTrash from "../../hooks/useSetTrash";
type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["IND_WoodenBoat_01_SM.003"]: THREE.MeshStandardMaterial;
  };
};

function Boat(props: JSX.IntrinsicElements["group"]) {
  const clickedEarth = useRecoilValue(clickedEarthState);
  const { nodes, materials } = useGLTF("/assets/gltf/wooden_boat.glb") as
    | GLTFResult
    | any;
  const boat = useRef<THREE.Group>(null);
  const mesh = useMemo(() => {
    return new THREE.Mesh(
      nodes.Object_2.geometry,
      materials["IND_WoodenBoat_01_SM.003"]
    );
  }, []);
  useHideBoat(boat, props.userData?.clickTarget);
  useSetTrash(boat);
  useMoveBoat(boat, props.userData?.point);
  return (
    <group {...props} ref={boat} dispose={null}>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        visible={clickedEarth ? true : false}
      >
        <primitive object={mesh} />
      </group>
    </group>
  );
}

export default Boat;

useGLTF.preload("/assets/gltf/wooden_boat.glb/wooden_boat.glb");
