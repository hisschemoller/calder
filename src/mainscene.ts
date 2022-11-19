import { ExtendedObject3D, Scene3D, THREE } from 'enable3d';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { setupMobile, setupRoom, setupRotor } from './room';

// @ts-ignore
export default class MainScene extends Scene3D {
  audioContext: AudioContext | undefined;

  camera: THREE.PerspectiveCamera;

  cameraTarget: THREE.Vector3;

  orbitControls: OrbitControls | undefined;

  pointerCoords: THREE.Vector2;

  pointerdownRequest: boolean;

  raycaster: THREE.Raycaster;

  resizeRequest: boolean;

  rotor: ExtendedObject3D | undefined;

  constructor() {
    super({ key: 'MainScene' });
    this.camera = new THREE.PerspectiveCamera();
    this.cameraTarget = new THREE.Vector3();
    this.pointerCoords = new THREE.Vector2();
    this.pointerdownRequest = false;
    this.raycaster = new THREE.Raycaster();
    this.resizeRequest = false;
  }

  async create() {
    this.physics.setGravity(0, -9.8, 0);
    // this.physics.debug?.enable();

    this.cameraTarget = new THREE.Vector3(0, 1.8, 0);

    // CAMERA
    this.camera.position.set(0, 1.8, 7);
    this.camera.lookAt(this.cameraTarget);
    this.camera.updateProjectionMatrix();

    // AMBIENT LIGHT
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    this.scene.add(ambientLight);

    // DIRECTIONAL LIGHT
    const SHADOW_MAP_SIZE = 2048;
    const SHADOW_FAR = 13500;
    const SHADOW_SIZE = 6;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(8, 10, 4);
    directionalLight.color.setHSL(0, 1, 0.98);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = SHADOW_MAP_SIZE;
    directionalLight.shadow.mapSize.height = SHADOW_MAP_SIZE;
    directionalLight.shadow.camera.left = -SHADOW_SIZE;
    directionalLight.shadow.camera.right = SHADOW_SIZE;
    directionalLight.shadow.camera.top = SHADOW_SIZE;
    directionalLight.shadow.camera.bottom = -SHADOW_SIZE;
    directionalLight.shadow.camera.far = SHADOW_FAR;
    this.scene.add(directionalLight);

    // ORBIT CONTROLS
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.target = this.cameraTarget;
    this.orbitControls.update();
    this.orbitControls.saveState();

    this.resizeRequest = true;

    setupRoom(this);
    this.rotor = setupRotor(this);
    setupMobile(this, this.rotor);
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap; // PCFSoftShadowMap

    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      if (!this.pointerdownRequest) {
        this.pointerCoords.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
        );
        this.pointerdownRequest = true;
      }
    });

    document.addEventListener('pointerdown', () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioContext.resume();
      }
    });

    window.addEventListener('resize', () => {
      this.resizeRequest = true;
    });
  }
  
  preload() {
    this.load.svg('svg/calder1.svg');
    // this.load.preload
  }

  processClick() {
    this.pointerdownRequest = false;
    console.log('click', this.pointerCoords);
  }

  resize() {
    this.resizeRequest = false;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
  }

  update() {
    if (this.resizeRequest) {
      this.resize();
    }
    if (this.pointerdownRequest) {
      this.processClick();
    }

    if (this.rotor) {
      this.rotor.rotation.y += 0.005;
      this.rotor.body.needUpdate = true
    }
  }
}
