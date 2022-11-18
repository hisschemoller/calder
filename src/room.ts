import { ExtendedGroup, ExtendedObject3D, Scene3D, THREE } from 'enable3d';

const LINE_RADIUS = 0.01;
const ROOM_HEIGHT = 5;
const ROTOR_HEIGHT = 0.5;
const ROTOR_WIDTH = 6;

function createLine(
  height: number,
  parent: ExtendedObject3D,
  parentPivot: THREE.Vector3,
  position: THREE.Vector3,
  scene3d: Scene3D,
) {
  const line = scene3d.physics.add.cylinder({
    height, radiusBottom: LINE_RADIUS, radiusTop: LINE_RADIUS,
    x: position.x,
    y: position.y,
    z: position.z,
    collisionFlags: 0, mass: 1,
  });
  // line.body.setFriction(0.5);
  // line.body.setDamping(0.9, 0.9);

  scene3d.physics.add.constraints.pointToPoint(parent.body, line.body, {
    pivotA: { x: parentPivot.x, y: parentPivot.y, z: parentPivot.z },
    pivotB: { y: height / 2 },
  });
  scene3d.physics.add.existing(line, { collisionFlags: 0, mass: 1 });

  return line;
}

export function setupMobile(scene3d: Scene3D, rotor: ExtendedObject3D) {
  const lineHeight = 2;

  const lineLeft = createLine(
    lineHeight,
    rotor,
    new THREE.Vector3(ROTOR_WIDTH / -2, -ROTOR_HEIGHT, 0),
    new THREE.Vector3(ROTOR_WIDTH / -2, ROOM_HEIGHT - ROTOR_HEIGHT - (lineHeight / 2), 0),
    scene3d,
  );

  const lineRight = createLine(
    lineHeight,
    rotor,
    new THREE.Vector3(ROTOR_WIDTH / 2, -ROTOR_HEIGHT, 0),
    new THREE.Vector3(ROTOR_WIDTH / 2, ROOM_HEIGHT - ROTOR_HEIGHT - (lineHeight / 2), 0),
    scene3d,
  );

  // const lineLeft = scene3d.physics.add.cylinder({
  //   height: lineHeight, radiusBottom: LINE_RADIUS, radiusTop: LINE_RADIUS,
  //   x: ROTOR_WIDTH / -2,
  //   y: ROOM_HEIGHT - ROTOR_HEIGHT - (lineHeight / 2),
  //   collisionFlags: 0, mass: 1,
  // });
  // // lineLeft.body.setFriction(0.5);
  // // lineLeft.body.setDamping(0.9, 0.9);

  // scene3d.physics.add.constraints.pointToPoint(rotor.body, lineLeft.body, {
  //   pivotA: { x: ROTOR_WIDTH / -2, y: -ROTOR_HEIGHT },
  //   pivotB: { y: lineHeight / 2 },
  // });
  // scene3d.physics.add.existing(lineLeft, { collisionFlags: 0, mass: 1 });
}

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
  ground.body.setFriction(0.5);

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

export function setupRotor(scene3d: Scene3D) {
  const rotorRadius = 0.05;

  const rotor = new ExtendedObject3D();
  rotor.position.y = ROOM_HEIGHT;

  const axis = scene3d.add.cylinder({
    height: ROTOR_HEIGHT, radiusBottom: rotorRadius, radiusTop: rotorRadius, y: ROTOR_HEIGHT / -2,
  });
  rotor.add(axis);

  const bar = scene3d.add.cylinder({
    height: ROTOR_WIDTH, radiusBottom: rotorRadius, radiusTop: rotorRadius, y: -ROTOR_HEIGHT,
  });
  bar.rotation.z = Math.PI / 2;
  rotor.add(bar);

  scene3d.add.existing(rotor);
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
