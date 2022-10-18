import * as THREE from "three";
import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useRecoilState } from "recoil";
import { trashInfoState } from "../../atoms";

interface IMeshes {
  mesh: THREE.Mesh;
  position: THREE.Vector3;
}

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
  useEffect(() => {
    meshes.forEach((info) => {
      setTrashInfo((old) => [
        ...old,
        { uuid: info.mesh.uuid, position: info.position, contactBoat: false },
      ]);
    });
    console.log(trashes.current);
  }, []);
  useEffect(() => {
    console.log("닿은걸 감지");
    const target = trashInfo.filter((info) => info.contactBoat === true);
    trashes.current?.children.forEach((trash) => {
      target.forEach((item) => {
        if (item.uuid === trash.children[0].uuid) {
          trash.children[0].visible = false;
        }
      });
      // console.log(trash.children);
    });
  }, [trashInfo]);

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
