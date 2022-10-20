import { useMemo, useEffect } from "react";
import * as THREE from "three";

/**
 * 범위 내 랜덤으로 오브젝트 생성
 * @value 생성 범위
 * @returns 포지션이 담긴 배열
 */
function useSetRandomPosition(
  range: number,
  plastic: React.RefObject<THREE.Group>
) {
  const positions = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < 50; i++) {
      arr.push(
        new THREE.Vector3(
          Math.random() * range - range / 2,
          Math.random() * range - 100,
          Math.random() * range - range / 2
        )
      );
    }
    return arr;
  }, []);

  useEffect(() => {
    plastic.current?.children.forEach((item) => {
      item.rotation.set(Math.random(), Math.random(), Math.random(), "XYZ");
    });
  }, []);

  return positions;
}

export default useSetRandomPosition;
