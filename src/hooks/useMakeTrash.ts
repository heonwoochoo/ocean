import { useMemo } from "react";
import * as THREE from "three";
interface IMeshes {
  mesh: THREE.Mesh;
  position: THREE.Vector3;
}

/**
 * 쓰레기 생성
 * @returns 쓰레기의 mesh와 position을 담은 배열
 */
function useMakeTrash(nodes: any, materials: any) {
  const meshes = useMemo<IMeshes[]>(() => {
    const arr: IMeshes[] = [];
    Object.keys(nodes).forEach((v) => {
      if (nodes[v].isMesh) {
        arr.push(
          {
            mesh: new THREE.Mesh(nodes[v].geometry, materials.garbage),
            position: new THREE.Vector3(
              (Math.random() - 0.5) * 1200,
              10,
              (Math.random() - 0.5) * 1200
            ),
          },
          {
            mesh: new THREE.Mesh(nodes[v].geometry, materials.garbage),
            position: new THREE.Vector3(
              (Math.random() - 0.5) * 1200,
              10,
              (Math.random() - 0.5) * 1200
            ),
          }
        );
      }
    });
    return arr;
  }, []);
  return meshes;
}

export default useMakeTrash;
