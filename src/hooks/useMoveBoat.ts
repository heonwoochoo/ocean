import { useFrame, Vector3Props } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 클릭한 지점으로 보트를 이동
 * @param pointPosition 클릭 좌표
 */
function useMoveBoat(
  boat: React.RefObject<THREE.Group>,
  pointPosition: Vector3Props
) {
  useFrame(() => {
    const destinationX = pointPosition["x"] || 0;
    const destinationZ = pointPosition["z"] || 0;
    const targetX = boat.current?.position.x || 0;
    const targetZ = boat.current?.position.z || 0;
    boat.current?.lookAt(destinationX || -Math.PI / 2, 0.1, destinationZ || 0);
    if (
      Math.pow(destinationX - targetX, 2) +
        Math.pow(destinationZ - targetZ, 2) >
      0.003
    ) {
      boat.current?.position.set(
        targetX + (destinationX - targetX) * 0.02,
        0.1,
        targetZ + (destinationZ - targetZ) * 0.02
      );
    }
  });
}

export default useMoveBoat;
