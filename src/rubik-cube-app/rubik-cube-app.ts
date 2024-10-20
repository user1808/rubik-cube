import * as THREE from 'three';
import { toRaw } from 'vue';
import type { IRubikCube } from './rubik-cube/interfaces/structure';
import type { IRubikCubeFactory } from './rubik-cube/interfaces';
import { MouseTouchTracker, ScreenSize, ScreenSizeTracker } from './common';
import { CustomPersepctiveCamera, CustomRenderer, CustomOrbitControls } from './common/custom';
import { DebugModeCoordinator } from './rubik-cube/classes/debug/debug-mode-coordinator';
import { DebugAxes, DebugStats, DebugCubeUI } from './rubik-cube/classes/debug/subscribers';

export class RubikCubeApp {
  private readonly scene: THREE.Scene = new THREE.Scene();

  private readonly screenSize: ScreenSize = new ScreenSize();
  private readonly screenSizeTracker: ScreenSizeTracker = new ScreenSizeTracker();
  private readonly mouseTouchTracker: MouseTouchTracker = new MouseTouchTracker(this.screenSize);

  private readonly camera: CustomPersepctiveCamera = new CustomPersepctiveCamera(this.screenSize);
  private readonly renderer: CustomRenderer;
  private readonly orbitControls: CustomOrbitControls;

  private cubeFactory: Nullable<IRubikCubeFactory<Record<string, string>>> = null;
  private cube: Nullable<IRubikCube> = null;

  private readonly debugModeCoordinator = new DebugModeCoordinator({
    DebugStats: new DebugStats(),
    DebugAxes: new DebugAxes(this.scene),
    DebugCubeUI: new DebugCubeUI(),
  });

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new CustomRenderer(canvas, this.screenSize);
    this.screenSizeTracker.startTrack(this.screenSize, this.camera, this.renderer);
    this.orbitControls = new CustomOrbitControls(this.camera, canvas);
  }

  public async start(factory: IRubikCubeFactory<Record<string, string>>): Promise<void> {
    await this.changeCube(factory);
    this.prepareCamera();
    this.prepareTickMethod();
  }

  public async changeCube(factory: IRubikCubeFactory<Record<string, string>>): Promise<void> {
    this.cubeFactory = factory;
    this.removeCube();
    await this.prepareCube();
  }

  private removeCube() {
    if (!this.cube) return;
    this.cube.removeFromScene();
  }

  private async prepareCube(): Promise<void> {
    if (!this.cubeFactory) return;
    this.cube = await this.cubeFactory.createRubikCube(
      this.scene,
      this.camera,
      this.mouseTouchTracker,
      this.orbitControls,
    );
    this.cube.addToScene();
    this.debugModeCoordinator.getSubscriber('DebugCubeUI').setCube(this.cube, this.cubeFactory);
  }

  private prepareCamera(): void {
    this.scene.add(this.camera);
  }

  private prepareTickMethod(): void {
    const tick = () => {
      this.debugModeCoordinator.getSubscriber('DebugStats').start();
      this.orbitControls.update();
      this.renderer.render(toRaw(this.scene), toRaw(this.camera));
      this.debugModeCoordinator.getSubscriber('DebugStats').end();

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
