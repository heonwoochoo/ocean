import { useEffect, useMemo, useRef } from "react";
import { useTexture, Image } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
function PenguinImages(props: JSX.IntrinsicElements["mesh"]) {
  const position = new THREE.Vector3(
    props.userData?.penguin["x"] + 3.5,
    props.userData?.penguin["y"] + 3,
    props.userData?.penguin["z"] + 0.5
  );
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

  return (
    <mesh
      ref={cube}
      geometry={geo}
      material={materialArray}
      position={position}
    />
  );
}

export default PenguinImages;
