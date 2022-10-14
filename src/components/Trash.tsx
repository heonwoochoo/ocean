import * as THREE from "three";
import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

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
  const { nodes, materials } = useGLTF("assets/gltf/street_garbage.glb") as
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
    console.log(trashes.current);
  }, []);
  // useFrame(({ clock }) => {
  //   const time = clock.getElapsedTime();
  //   trashes.current?.children.forEach((trash) => {
  //     trash.position.set(
  //       trash.position.x,
  //       Math.cos(time) * 4 + 4,
  //       trash.position.z
  //     );
  //   });
  // });
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

useGLTF.preload("assets/gltf/street_garbage.glb");
