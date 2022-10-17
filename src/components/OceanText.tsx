import { Center, Text } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
function OceanText() {
  const mat = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "red",
      }),
    []
  );
  return (
    <Center
      position={[10, 0.1, 10]}
      rotation={[-Math.PI / 2, 0, Math.PI / 4, "XYZ"]}
    >
      <Text fontSize={2} material={mat}>
        Move the boat to pick up the trash.
      </Text>
    </Center>
  );
}

export default OceanText;
