import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
function Overlay(props: JSX.IntrinsicElements["mesh"]) {
  const { camera } = useThree();
  useEffect(() => {}, []);
  const overlay = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={overlay} {...props}>
      <planeGeometry args={[10, 10, 10]} />
      <meshBasicMaterial transparent={true} color="black" opacity={0.7} />
    </mesh>
  );
}

export default Overlay;
