import { Center, Text3D } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useRef, useEffect } from "react";

function TargetText(props: JSX.IntrinsicElements["group"]) {
  const text = useRef<THREE.Group>(null);
  const { camera } = useThree();
  useEffect(() => {
    text.current?.lookAt(camera.position);
  }, [props.userData?.target]);
  useFrame(() => {
    if (props.userData?.target) {
    }
  });
  return (
    <Center ref={text} {...props}>
      <Text3D
        font={"assets/font/Source Sans Pro_Regular.json"}
        bevelEnabled
        bevelSize={0.05}
      >
        Click
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
}
export default TargetText;
