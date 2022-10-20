import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { trashInfoState } from "../atoms";

type ContactBoatFunc = (a: THREE.Vector3, b: THREE.Vector3) => boolean;

const isContactBoat: ContactBoatFunc = (trashPosition, boatPosition) => {
  const distanceX = Math.abs(trashPosition.x * 0.1 - boatPosition.x);
  const distanceZ = Math.abs(trashPosition.z * 0.1 - boatPosition.z);

  if (distanceX < 5 && distanceZ < 5) {
    return true;
  }
  return false;
};

/**
 * 보트가 쓰레기와 근접할 경우 쓰레기의 상태 값 변경
 */
function useSetTrash(boat: React.RefObject<THREE.Group>) {
  const [trashInfo, setTrashInfo] = useRecoilState(trashInfoState);
  useEffect(() => {
    trashInfo.forEach((info, i) => {
      if (
        info.contactBoat === false &&
        isContactBoat(info.position, boat.current?.position as THREE.Vector3)
      ) {
        const newInfos = [...trashInfo];
        newInfos[i] = {
          ...newInfos[i],
          contactBoat: true,
        };
        setTrashInfo(newInfos);
      }
    });
  }, [boat.current?.position.x]);
  return;
}

export default useSetTrash;
