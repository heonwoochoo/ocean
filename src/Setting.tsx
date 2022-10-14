import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";

function Setting() {
  const { camera, gl } = useThree();
  useEffect(() => {
    camera.position.set(20, 30, 20);
    camera.lookAt(0, 0, 0);
    console.log(gl.info);
  }, []);

  useFrame(({ gl }) => {
    gl.setSize(window.innerWidth, window.innerHeight);
  });
  return null;
}

export default Setting;
