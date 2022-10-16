import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame, useThree } from "@react-three/fiber";
import { distance, isContactBoat, value } from "../utils/helper";
import { useRecoilState } from "recoil";
import { trashInfoState } from "../atoms";
type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    IND_WoodenBoat_01_SM: THREE.MeshStandardMaterial;
  };
};

function Boat(props: JSX.IntrinsicElements["group"]) {
  const [trashInfo, setTrashInfo] = useRecoilState(trashInfoState);
  const { nodes, materials } = useGLTF("assets/gltf/wooden_boat.glb") as
    | GLTFResult
    | any;
  const boat = useRef<THREE.Group>(null);

  useEffect(() => {
    if (props.userData?.clickTarget) {
      boat.current!.visible = false;
    } else {
      boat.current!.visible = true;
      boat.current?.position.set(0, 0.1, 0);
    }
  }, [props.userData?.clickTarget]);

  useEffect(() => {
    trashInfo.forEach((info, i) => {
      // 보트랑 쓰레기가 닿을 경우
      if (
        isContactBoat(info.position, boat.current?.position as THREE.Vector3)
      ) {
        const newInfos = [...trashInfo];
        newInfos[i] = {
          ...newInfos[i],
          contactBoat: true,
        };
        console.log("닿았다");
        setTrashInfo(newInfos);
      }
    });
  }, [boat.current?.position.x]);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 5;
    const destinationX = props.userData?.point["x"];
    const destinationZ = props.userData?.point["z"];
    const targetX = boat.current?.position.x || 0;
    const targetZ = boat.current?.position.z || 0;
    boat.current?.lookAt(
      props.userData?.point["x"] || -Math.PI / 2,
      0.1,
      props.userData?.point["z"] || 0
    );
    if (distance(destinationX, targetX, destinationZ, targetZ) > 0.003) {
      boat.current?.position.set(
        targetX + (destinationX - targetX) * 0.01,
        0.1,
        targetZ + (destinationZ - targetZ) * 0.01
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
