import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRecoilState } from "recoil";
import { trashInfoState } from "../../atoms";
import useRemoveTrash from "../../hooks/useRemoveTrash";
import useMakeTrash from "../../hooks/useMakeTrash";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder_garbage_0: THREE.Mesh;
    Cylinder001_garbage_0: THREE.Mesh;
    Plane_garbage_0: THREE.Mesh;
    Cube_garbage_0: THREE.Mesh;
    Cube001_garbage_0: THREE.Mesh;
    Cube002_garbage_0: THREE.Mesh;
    Cube003_garbage_0: THREE.Mesh;
    Cube004_garbage_0: THREE.Mesh;
    Cube005_garbage_0: THREE.Mesh;
    Cube006_garbage_0: THREE.Mesh;
    Cylinder002_garbage_0: THREE.Mesh;
    Cylinder003_garbage_0: THREE.Mesh;
    Cylinder004_garbage_0: THREE.Mesh;
    Plane001_garbage_0: THREE.Mesh;
    Plane002_garbage_0: THREE.Mesh;
    Plane003_garbage_0: THREE.Mesh;
    Cylinder005_garbage_0: THREE.Mesh;
    Cube007_garbage_0: THREE.Mesh;
    Cylinder006_garbage_0: THREE.Mesh;
    Plane004_garbage_0: THREE.Mesh;
  };
  materials: {
    garbage: THREE.MeshStandardMaterial;
  };
};

function Trash(props: JSX.IntrinsicElements["group"]) {
  const [trashInfo, setTrashInfo] = useRecoilState(trashInfoState);
  const { nodes, materials } = useGLTF("/assets/gltf/street_garbage.glb") as
    | GLTFResult
    | any;
  const trashes = useRef<THREE.Group>(null);
  const meshes = useMakeTrash(nodes, materials);
  useEffect(() => {
    meshes.forEach((info) => {
      setTrashInfo((old) => [
        ...old,
        { uuid: info.mesh.uuid, position: info.position, contactBoat: false },
      ]);
    });
  }, []);

  useRemoveTrash(trashInfo, trashes);

  return (
    <group ref={trashes} {...props} dispose={null}>
      {meshes.map(({ mesh, position }) => (
        <group
          key={mesh.uuid}
          rotation={[-Math.PI / 2, 0, 0]}
          position={position}
        >
          <primitive object={mesh} />
        </group>
      ))}
    </group>
  );
}

export default Trash;

useGLTF.preload("/assets/gltf/street_garbage.glb");
