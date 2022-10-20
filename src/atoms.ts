import { atom } from "recoil";
import * as THREE from "three";

export interface ITrash {
  uuid: string;
  position: THREE.Vector3;
  contactBoat: boolean;
}

export const trashInfoState = atom<ITrash[]>({
  key: "trashInfo",
  default: [],
});

export const textAnimationFinish = atom<boolean>({
  key: "textAnimation",
  default: false,
});

export const clickedEarthState = atom<boolean>({
  key: "earth",
  default: false,
});

export const mouseOnEarthState = atom<boolean>({
  key: "mouseOnEarth",
  default: false,
});

export const timerState = atom<boolean>({
  key: "timer",
  default: true,
});
