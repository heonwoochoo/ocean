import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane_Material_0: THREE.Mesh;
    Object_64: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    Polar: THREE.MeshStandardMaterial;
  };
};

type ActionName = "Urso_RIG|Urso_RIGAction";
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

function PolarBear(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF("assets/gltf/polar.glb") as
    | GLTFResult
    | any;
  const { actions } = useAnimations(
    animations,
    group as React.MutableRefObject<THREE.Object3D>
  );
  useEffect(() => {
    if (actions !== null) {
      actions["Urso_RIG|Urso_RIGAction"]!.play();
    }
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Polarfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Urso_RIG"
                  position={[117.4, 123.73, 0]}
                  rotation={[Math.PI / 2, -1.47, Math.PI]}
                  scale={100}
                >
                  <group name="Object_16">
                    <primitive object={nodes._rootJoint} />
                    <group
                      name="Object_63"
                      position={[0, 113.63, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={[26.16, 52.51, 52.51]}
                    />
                    <skinnedMesh
                      name="Object_64"
                      geometry={nodes.Object_64.geometry}
                      material={materials.Polar}
                      skeleton={nodes.Object_64.skeleton}
                    />
                  </group>
                </group>
                <group
                  name="Lamp002"
                  position={[567.75, 52.21, -19.19]}
                  rotation={[1.58, 0.11, -3.12]}
                  scale={[63.8, 99.99, 99.64]}
                >
                  <group name="Object_5" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_6" />
                  </group>
                </group>
                <group
                  name="Lamp001"
                  position={[417.41, 52.21, -19.19]}
                  rotation={[1.56, -0.11, 0.01]}
                  scale={[63.79, 99.99, 99.64]}
                >
                  <group name="Object_8" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_9" />
                  </group>
                </group>
                <group
                  name="Lamp"
                  position={[301.24, 52.21, -19.19]}
                  rotation={[0.71, 0.39, -0.39]}
                  scale={100}
                >
                  <group name="Object_11" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_12" />
                  </group>
                </group>
                <group
                  name="Camera"
                  position={[-2.04, 82.7, 1408.79]}
                  rotation={[0, 1.57, 0]}
                  scale={100}
                >
                  <group name="Object_14" />
                </group>
                <group
                  name="Urso"
                  position={[0, 113.63, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[26.16, 52.51, 52.51]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default PolarBear;

useGLTF.preload("assets/gltf//polar.glb");
