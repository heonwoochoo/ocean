import * as THREE from "three";
import { useMemo } from "react";

function Sand(props: JSX.IntrinsicElements["group"]) {
  const geo = useMemo(() => new THREE.CylinderGeometry(1, 1, 0.1), []);
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "white" }),
    []
  );
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={geo} material={mat} />
    </group>
  );
}

export default Sand;
