import { ExtendedMesh, ExtendedObject3D, Scene3D, THREE } from 'enable3d';
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

export function createVase(
  scene3d: Scene3D,
  svgScale = 0.02,
) {
  new SVGLoader().load('svg/vaas2.svg', async (data) => {
    const points = data.paths[0].currentPath.getPoints(1);
    const geometry = new THREE.LatheGeometry(points);
    const material = new THREE.MeshPhongMaterial({ color: 0xd2d0cb, shininess: 1.2 });
    const lathe = new ExtendedMesh(geometry, material);
    lathe.position.set(-3, 2, -2.1);
    lathe.scale.set(svgScale, svgScale, svgScale);
    lathe.castShadow = true;
    lathe.receiveShadow = true;
    scene3d.add.existing(lathe);
    scene3d.physics.add.existing(lathe as unknown as ExtendedObject3D, { shape: 'mesh' });
  });
}
