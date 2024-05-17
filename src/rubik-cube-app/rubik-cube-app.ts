import * as THREE from 'three';
import { ScreenSize, ScreenSizeTracker } from './common';
import {
  CustomPersepctiveCamera,
  CustomRenderer,
  CustomOrbitControls,
  CustomDebugGUI,
} from './common/custom';
import { toRaw, isProxy } from 'vue';
import type { TUniversalRubikCubeFactory } from './rubik-cube/interfaces/rubik-cube-factory';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import type { TUniversalRubikCube } from './rubik-cube/interfaces/structure/rubik-cube';

export class RubikCubeApp {
  private readonly scene: THREE.Scene = new THREE.Scene();

  private readonly screenSize: ScreenSize = new ScreenSize();
  private readonly screenSizeTracker: ScreenSizeTracker = new ScreenSizeTracker();

  private readonly camera: CustomPersepctiveCamera;
  private readonly renderer: CustomRenderer;
  private readonly controls: CustomOrbitControls;

  private readonly stats: Stats = new Stats();
  private debugGUI: CustomDebugGUI = new CustomDebugGUI();

  private cube: Nullable<TUniversalRubikCube> = null;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new CustomPersepctiveCamera(this.screenSize);
    this.renderer = new CustomRenderer(canvas, this.screenSize);
    this.screenSizeTracker.startTrack(this.screenSize, this.camera, this.renderer);
    this.controls = new CustomOrbitControls(this.camera, canvas);

    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }

  public async start(factory: TUniversalRubikCubeFactory): Promise<void> {
    await this.setUpCube(factory);
    this.setUpCamera();
    this.setUpTick();
  }

  public async changeCube(factory: TUniversalRubikCubeFactory): Promise<void> {
    this.removeCube();
    await this.setUpCube(factory);
  }

  private removeCube() {
    if (this.cube) {
      this.cube.dispose();
      this.scene.remove(this.cube);
    }
  }

  private async setUpCube(factory: TUniversalRubikCubeFactory): Promise<void> {
    this.cube = await factory.createRubikCube();
    this.scene.add(this.cube);
    this.setUpDebugUI();
  }

  private setUpCamera(): void {
    this.scene.add(this.camera);
  }

  private setUpTick(): void {
    const tick = () => {
      this.stats.begin();
      this.controls.update();
      this.renderer.render(isProxy(this.scene) ? toRaw(this.scene) : this.scene, this.camera);
      this.stats.end();

      window.requestAnimationFrame(tick);
    };

    tick();
  }

  private setUpDebugUI(): void {
    if (!this.cube) return;

    const cubeRotationGroups = Object.keys(this.cube.cubeRotationGroups);
    const cubeRotaitonTypes = Object.keys(this.cube.cubeRotationData.rotationTypesData);
    const debugParams = {
      face: cubeRotationGroups[0],
      rotationType: cubeRotaitonTypes[0],
    };
    const debugFunctions = {
      rotation: () => {
        toRaw(this.cube)?.rotate(debugParams.face, debugParams.rotationType, this.scene);
      },
    };
    this.debugGUI = new CustomDebugGUI();
    this.debugGUI.add(debugParams, 'face', cubeRotationGroups).name('Face');
    this.debugGUI.add(debugParams, 'rotationType', cubeRotaitonTypes).name('Rotation Type');
    this.debugGUI.add(debugFunctions, 'rotation').name('Rotate Cube');
  }
}
