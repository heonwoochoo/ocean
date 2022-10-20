import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import useResizeCube from "../../hooks/useResizeCube";

const variants = {
  hidden: { scale: 0 },
  visible: { scale: 0.9 },
};

function PolarImages(props: JSX.IntrinsicElements["group"]) {
  const loader = useTexture([
    "/assets/images/texture/b1.jpg",
    "/assets/images/texture/b2.jpg",
    "/assets/images/texture/b3.jpg",
    "/assets/images/texture/b4.jpg",
    "/assets/images/texture/b5.jpg",
    "/assets/images/texture/b6.jpg",
  ]);
  const materialArray = useMemo(
    () =>
      Array.from({ length: 6 }).map(
        (v, i) =>
          new THREE.MeshBasicMaterial({
            map: loader[i],
          })
      ),
    []
  );
  const geo = useMemo(() => new THREE.BoxGeometry(0.7, 0.7, 0.7), []);
  const cube = useRef<THREE.Group>(null);
  useResizeCube(cube);
  useFrame(({ camera, clock }) => {
    if (props.userData?.target === "polar") {
      const time = clock.getElapsedTime();
      cube.current?.position.set(
        camera.position["x"] - 1,
        camera.position["y"] - 1,
        camera.position["z"] - 2
      );
      cube.current?.rotation.set(0, time * 0.2, 0);
    }
  });
  return (
    <group ref={cube}>
      {props.userData?.target === "polar" ? (
        <motion.mesh
          geometry={geo}
          material={materialArray}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.5, duration: 1 }}
        />
      ) : null}
    </group>
  );
}

export default PolarImages;
