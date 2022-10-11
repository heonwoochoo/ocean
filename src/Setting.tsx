import { useFrame } from "@react-three/fiber";

function Setting() {
  useFrame(({ gl }) => {
    gl.setSize(window.innerWidth, window.innerHeight);
  });
  return null;
}

export default Setting;
