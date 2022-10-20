import { useEffect } from "react";
import * as THREE from "three";
/**
 * 브라우저 창 크기에 따라 큐브 사이즈 조절
 */
function useResizeCube(cube: React.RefObject<THREE.Group>) {
  useEffect(() => {
    const scaleValue =
      window.innerWidth / window.screen.availWidth +
      window.innerHeight / window.screen.availHeight;
    cube.current?.scale.set(scaleValue, scaleValue, scaleValue);
  }, [window.innerWidth, window.innerHeight]);
}

export default useResizeCube;
