import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { trashInfoState } from "../atoms";

/**
 * 쓰레기 수집량에 따라 플라스틱 개수 조절
 */
function useRemovePlastic(plastic: React.RefObject<THREE.Group>) {
  const trashInfo = useRecoilValue(trashInfoState);
  useEffect(() => {
    let count = 0;
    trashInfo.forEach((info) => (info.contactBoat === true ? count++ : null));
    plastic.current?.children.forEach((item, i, arr) => {
      if (i / arr.length < count / trashInfo.length) {
        item.visible = false;
      }
    });
  }, [trashInfo]);
}

export default useRemovePlastic;
