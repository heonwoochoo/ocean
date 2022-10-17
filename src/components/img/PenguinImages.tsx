import { useEffect, useMemo, useRef } from "react";
import { useTexture, Image } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
function PenguinImages(props: JSX.IntrinsicElements["mesh"]) {
  const { camera } = useThree();

  const loader = useTexture([
    "/assets/images/texture/p1.jpg",
    "/assets/images/texture/p2.png",
    "/assets/images/texture/p3.jpg",
    "/assets/images/texture/p4.jpg",
    "/assets/images/texture/p5.jpg",
    "/assets/images/texture/p6.jpg",
  ]);
  const materialArray = useMemo(
    () =>
      Array.from({ length: 6 }).map(
        (v, i) =>
          new THREE.MeshBasicMaterial({
            map: loader[i],
          })
      ),
    []
  );
  const geo = useMemo(() => new THREE.BoxGeometry(0.7, 0.7, 0.7), []);
  const cube = useRef<THREE.Mesh>(null);
  useEffect(() => {
    console.log(cube.current);
    const scaleValue =
      window.innerWidth / window.screen.availWidth +
      window.innerHeight / window.screen.availHeight;
    cube.current?.scale.set(scaleValue, scaleValue, scaleValue);
  }, [window.innerWidth, window.innerHeight]);
  useFrame(({ camera }) => {
    if (props.userData?.target === "penguin") {
      cube.current?.position.set(
        camera.position["x"] - 1,
        camera.position["y"] - 1,
        camera.position["z"] - 2
      );
    }
  });
  return (
    <mesh
      visible={props.userData?.target === "penguin" ? true : false}
      ref={cube}
      geometry={geo}
      material={materialArray}
    />
  );
}

export default PenguinImages;
