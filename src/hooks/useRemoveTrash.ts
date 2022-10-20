import { useEffect } from "react";
import { ITrash } from "../atoms";

/**
 * 보트와 쓰레기가 닿을 경우 쓰레기를 제거
 */
function useRemoveTrash(
  trashInfo: ITrash[],
  trashes: React.RefObject<THREE.Group>
) {
  useEffect(() => {
    const target = trashInfo.filter((info) => info.contactBoat === true);
    trashes.current?.children.forEach((trash) => {
      target.forEach((item) => {
        if (item.uuid === trash.children[0].uuid) {
          trash.children[0].visible = false;
        }
      });
    });
  }, [trashInfo]);
}

export default useRemoveTrash;
