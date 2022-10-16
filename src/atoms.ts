import { atom, selector } from "recoil";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

interface ITrash {
  uuid: string;
  position: THREE.Vector3;
  contactBoat: boolean;
}

export const trashInfoState = atom<ITrash[]>({
  key: "trashInfo",
  default: [],
});
