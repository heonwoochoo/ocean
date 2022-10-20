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

function PenguinImages(props: JSX.IntrinsicElements["group"]) {
  const loader = useTexture([
    "/assets/images/texture/p1.jpg",
    "/assets/images/texture/p2.png",
    "/assets/images/texture/p3.jpg",
    "/assets/images/texture/p4.jpg",
    "/assets/images/texture/p5.jpg",
    "/assets/images/texture/p6.jpg",
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
    if (props.userData?.target === "penguin") {
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
      {props.userData?.target === "penguin" ? (
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

export default PenguinImages;
