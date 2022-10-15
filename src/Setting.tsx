import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
interface IProps {
  clickTarget: "penguin" | "polar" | null;
  position: {
    penguin: THREE.Vector3;
    penguinClick: Vector3;
    polar: THREE.Vector3;
    polarClick: Vector3;
  };
}

function Setting(props: IProps) {
  const { camera, gl } = useThree();
  useEffect(() => {
    if (props.clickTarget === null) {
      camera.position.set(20, 30, 20);
      camera.lookAt(0, 0, 0);
    }

    console.log(gl.info);
    console.log(props.clickTarget);
  }, [props.clickTarget]);

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
          props.position.penguin["x"] + 4,
          props.position.penguin["y"] + 5,
          props.position.penguin["z"] + 4
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
        0.03
      );
    }
  });
  return null;
}

export default Setting;
