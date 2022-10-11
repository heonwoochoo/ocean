import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Water } from "three-stdlib";

function Ocean() {
  const waterGeo = new THREE.PlaneGeometry(500, 500);
  const water = new Water(waterGeo, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "assets/images/waternormals.jpg",
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
  });
  water.rotateX(-Math.PI / 2);
  useFrame(() => {
    water.material.uniforms["time"].value += 0.3 / 60;
  });
  return (
    <group>
      <primitive object={water} />
    </group>
  );
}

export default Ocean;
