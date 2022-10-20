import { useFrame } from "@react-three/fiber";

/**
 * 물체가 반복하여 떨어짐
 * @param range 높이
 */
function useDrop(range: number, plastic: React.RefObject<THREE.Group>) {
  useFrame(() => {
    plastic.current?.children.forEach((item) => {
      if (item.position.y < 0) item.position.y = range;
      item.position.y -= 1;
    });
  });
}

export default useDrop;
