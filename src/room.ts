import { ExtendedObject3D, Scene3D, THREE } from 'enable3d';

const ROOM_HEIGHT = 5;

export function setupRoom(scene3d: Scene3D) {
  const groundHeight = 1;
  const roomDepth = 16;
  const roomWidth = 20;
  const wallThickness = 0.1;

  const ground = scene3d.physics.add.box(
    { collisionFlags: 1, mass: 0,
      depth: roomDepth, height: groundHeight, width: roomWidth, y: groundHeight / -2},
    { phong: { opacity: 1, transparent: false } },
  );

  for (let i = 0; i < 4; i++) {
    const x = i % 2 == 0 ? 0 : i < 2 ? roomWidth / 2  : roomWidth / -2;
    const z = i % 2 == 1 ? 0 : i < 2 ? roomDepth / 2  : roomDepth / -2;
    const width = i % 2 == 0 ? roomWidth : roomDepth;
    const wall = scene3d.add.box(
      { width, height: ROOM_HEIGHT, depth: wallThickness, x, y: ROOM_HEIGHT / 2, z },
      { phong: { opacity: 1, transparent: false } },
    );
    if (i % 2 == 1) {
      wall.rotation.y = Math.PI / 2;
    }
    scene3d.physics.add.existing(wall, { collisionFlags: 1, mass: 0 });
  }

  // scene3d.add.sphere({ radius: 0.1, y: ROOM_HEIGHT}, { phong: { color: 0xff0000 } });

  return ground;
}

export function setupRotor(scene3d: Scene3D, ground: ExtendedObject3D) {
  const rotorRadius = 0.05;
  const rotorHeight = 0.5;
  const rotorWidth = 6;

  const rotor = scene3d.add.cylinder({
    height: rotorHeight, radiusBottom: rotorRadius, radiusTop: rotorRadius, y: ROOM_HEIGHT - (rotorHeight / 2),
  });
  const bar = scene3d.add.cylinder({
    height: rotorWidth, radiusBottom: rotorRadius, radiusTop: rotorRadius, y: rotorHeight / -2,
  });
  bar.rotation.z = Math.PI / 2;
  rotor.add(bar);
  scene3d.physics.add.existing(rotor, { collisionFlags: 2, mass: 0 });

  // const hinge = scene3d.physics.add.constraints.hinge(ground.body, rotor.body, {
  //   pivotA: { y: ROOM_HEIGHT },
  //   pivotB: { y: rotorHeight / -2 },
  //   axisA: { y: 1 },
  //   axisB: { y: 1  },
  // });
  // hinge.enableAngularMotor(true, 0.2, 0.05);

  return rotor;
}
