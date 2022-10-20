import { useEffect } from "react";
import { ClickTarget } from "../App";
/**
 * 동물 클릭시 보트를 숨김
 */
function useHideBoat(
  boat: React.RefObject<THREE.Group>,
  clickTarget: ClickTarget
) {
  useEffect(() => {
    if (clickTarget) {
      boat.current!.visible = false;
    } else {
      boat.current!.visible = true;
      boat.current?.position.set(0, 0.1, 0);
    }
  }, [clickTarget]);
}

export default useHideBoat;
