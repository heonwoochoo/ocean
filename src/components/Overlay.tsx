import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
function Overlay(props: JSX.IntrinsicElements["mesh"]) {
  const overlay = useRef<THREE.Mesh>(null);
  useFrame(({ camera }) => {
    if (props.userData?.target) {
      overlay.current?.lookAt(camera.position);
      overlay.current?.position.set(
        camera.position["x"] - 2,
        camera.position["y"],
        camera.position["z"] - 2
      );
    }
  });

  return (
    <mesh
      visible={props.userData?.target ? true : false}
      ref={overlay}
      {...props}
    >
      <planeGeometry args={[10, 10, 10]} />
      <meshBasicMaterial transparent={true} color="black" opacity={0.7} />
    </mesh>
  );
}

export default Overlay;
