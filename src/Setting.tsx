import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { clickedEarthState } from "./atoms";
interface IProps {
  clickTarget: "penguin" | "polar" | null;
  position: {
    penguin: THREE.Vector3;
    penguinClick: Vector3;
    polar: THREE.Vector3;
    polarClick: Vector3;
    earth: THREE.Vector3;
  };
}

function Setting(props: IProps) {
  const { camera, gl } = useThree();
  const clickedEarth = useRecoilValue(clickedEarthState);
  const [timer, setTimer] = useState(true); // 카메라 위치 조정 타이머(2초 설정)
  useEffect(() => {
    if (
      props.clickTarget === null &&
      clickedEarth === true &&
      timer === false
    ) {
      camera.position.set(20, 30, 20);
      camera.lookAt(0, 0, 0);
    } else if (clickedEarth === false) {
      camera.position.set(
        props.position.earth["x"] + 20,
        props.position.earth["y"] + 20,
        props.position.earth["z"] + 20
      );
      camera.lookAt(props.position.earth); // 지구를 바라봄
    }
    if (clickedEarth) {
      const time = setTimeout(() => {
        setTimer(false);
        clearTimeout(time);
      }, 700);
    }
  }, [props.clickTarget, clickedEarth, timer]);
  useFrame(({ gl, camera }) => {
    gl.setSize(window.innerWidth, window.innerHeight);
    if (props.clickTarget === "penguin") {
      camera.lookAt(
        props.position.penguin["x"],
        props.position.penguin["y"] + 2,
        props.position.penguin["z"]
      );
      camera.position.lerp(
        new THREE.Vector3(
          props.position.penguin["x"] + 6,
          props.position.penguin["y"] + 5,
          props.position.penguin["z"] + 6
        ),
        0.03
      );
    } else if (props.clickTarget === "polar") {
      camera.lookAt(
        props.position.polar["x"],
        props.position.polar["y"] + 2,
        props.position.polar["z"]
      );
      camera.position.lerp(
        new THREE.Vector3(
          props.position.polar["x"] + 8,
          props.position.polar["y"] + 5,
          props.position.polar["z"] + 8
        ),
        0.01
      );
    } else if (
      props.clickTarget === null &&
      clickedEarth === true &&
      timer === true
    ) {
      if (timer) {
        camera.position.lerp(props.position.earth, 0.0001);
      }
    }
  });
  return null;
}

export default Setting;
