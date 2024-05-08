import * as THREE from 'three';
import { ScreenSize, ScreenSizeTracker } from './common';
import { CustomPersepctiveCamera, CustomRenderer, CustomOrbitControls } from './common/custom';
import type { RubikCube } from './rubik-cube/classes/rubik-cube/structure/cube/rubik-cube';
import { toRaw, isProxy } from 'vue';
import type { IRubikCubeFactory } from './rubik-cube/interfaces/rubik-cube-factory';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export class RubikCubeApp {
  private readonly scene: THREE.Scene = new THREE.Scene();

  private readonly screenSize: ScreenSize = new ScreenSize();
  private readonly screenSizeTracker: ScreenSizeTracker = new ScreenSizeTracker();

  private readonly camera: CustomPersepctiveCamera;
  private readonly renderer: CustomRenderer;
  private readonly controls: CustomOrbitControls;
  private readonly stats = new Stats();

  private cube: Nullable<RubikCube> = null;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new CustomPersepctiveCamera(this.screenSize);
    this.renderer = new CustomRenderer(canvas, this.screenSize);
    this.screenSizeTracker.startTrack(this.screenSize, this.camera, this.renderer);
    this.controls = new CustomOrbitControls(this.camera, canvas);

    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }

  public async start(factory: IRubikCubeFactory): Promise<void> {
    await this.setUpCube(factory);
    this.setUpCamera();
    this.setUpTick();
  }

  public async changeCube(factory: IRubikCubeFactory): Promise<void> {
    this.removeCube();
    await this.setUpCube(factory);
  }

  private removeCube() {
    if (this.cube) {
      this.cube.dispose();
      this.scene.remove(this.cube);
    }
  }

  private async setUpCube(factory: IRubikCubeFactory): Promise<void> {
    this.cube = await factory.createRubikCube();
    // TODO: remove this console.log
    console.log(toRaw(this.cube));
    console.log(toRaw(this.renderer.info));
    this.scene.add(this.cube);
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
}
