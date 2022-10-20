import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Star(props: JSX.IntrinsicElements["points"]) {
  const star = useRef<THREE.Points>(null);
  const starGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 500;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);
  const starMat = useMemo(() => new THREE.PointsMaterial({ size: 0.1 }), []);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.02;
    star.current?.rotation.set(time, 0, time);
  });
  return <points ref={star} {...props} geometry={starGeo} material={starMat} />;
}

export default Star;
