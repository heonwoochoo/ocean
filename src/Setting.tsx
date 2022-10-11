import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";

function Setting() {
  const { camera } = useThree();
  useEffect(() => {
    // camera.position.set(15, 35, 15);
    // camera.lookAt(0, 0, -3);
  });

  useFrame(({ gl }) => {
    gl.setSize(window.innerWidth, window.innerHeight);
  });
  return null;
}

export default Setting;
