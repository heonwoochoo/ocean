import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
};

function Overlay(props: JSX.IntrinsicElements["group"]) {
  const overlay = useRef<THREE.Group>(null);
  useFrame(({ camera }) => {
    if (props.userData?.target) {
      overlay.current?.lookAt(camera.position);
      overlay.current?.position.set(
        camera.position["x"] - 2,
        camera.position["y"],
        camera.position["z"] - 2
      );
    }
  });

  return (
    <group {...props} ref={overlay}>
      {props.userData?.target ? (
        <mesh>
          <planeGeometry args={[10, 10, 10]} />
          <motion.meshBasicMaterial
            transparent={true}
            color="black"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay: 1.5, duration: 0.5 }}
          />
        </mesh>
      ) : null}
    </group>
  );
}

export default Overlay;
