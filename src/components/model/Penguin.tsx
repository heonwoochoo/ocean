import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_28: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

type ActionName = "Iddle" | "Walk" | "Slide" | "Bite" | "Fall";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

function Penguin(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/assets/gltf/penguin2.glb"
  ) as GLTFResult | any;
  const { actions } = useAnimations(
    animations,
    group as React.MutableRefObject<THREE.Object3D>
  );
  useEffect(() => {
    actions["Walk"]?.play();
  }, []);
  return (
    <group ref={group} {...props} rotation={[0, Math.PI / 2, 0]} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="ee3fc61dae304d61bcd529d66822f459fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="PenguinArmature"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <group
                      name="Object_27"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <skinnedMesh
                      name="Object_28"
                      geometry={nodes.Object_28.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_28.skeleton}
                    />
                  </group>
                </group>
                <group
                  name="Penguin"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default Penguin;

useGLTF.preload("/assets/gltf/penguin2.glb");
