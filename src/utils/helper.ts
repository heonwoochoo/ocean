import { GLTFLoader } from "three-stdlib";
import * as THREE from "three";
import { Vector3 } from "@react-three/fiber";

type ContactBoatFunc = (a: THREE.Vector3, b: THREE.Vector3) => boolean;

export const distance = (x1: number, x2: number, y1: number, y2: number) => {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
};

export const value = (x1: number, x2: number) => {
  if (x1 - x2 > 0) {
    return 1;
  } else {
    return -1;
  }
};

export const isContactBoat: ContactBoatFunc = (trashPosition, boatPosition) => {
  const distanceX = Math.abs(trashPosition.x * 0.1 - boatPosition.x);
  const distanceZ = Math.abs(trashPosition.z * 0.1 - boatPosition.z);

  if (distanceX < 5 && distanceZ < 5) {
    console.log(distanceX, distanceZ);
    return true;
  }
  return false;
};
