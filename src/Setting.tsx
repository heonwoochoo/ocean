import { useFrame, useThree } from "@react-three/fiber";

function Setting() {
  const { camera } = useThree();
  camera.position.set(0, 17, 30);
  useFrame(({ gl }) => {
    gl.setSize(window.innerWidth, window.innerHeight);
  });
  return null;
}

export default Setting;
