import * as THREE from 'three';
import {
  CustomDebugGUI,
  CustomPersepctiveCamera,
  CustomRenderer,
  CustomOrbitControls,
} from './Common/Custom';
import { ScreenSizeRepo, ScreenSizeTracker, MouseTouchTracker } from './Common';
import type { IRubikCube } from './RubikCube/interfaces/IRubikCube';
import type { IRubikCubeRayCastingHelper } from './RubikCube/interfaces/IRubikCubeRayCastingHelper';
import type { IRubikCubeRotationHelper } from './RubikCube/interfaces/IRubikCubeRotationHelper';
import type { IRubikCubeFactory } from './RubikCube/interfaces/IRubikCubeFactory';

export class RubikCubeApp<
  FaceNames extends string,
  PieceCoverFaceName extends string,
  RotationTypes extends string,
> {
  private readonly gui: CustomDebugGUI = new CustomDebugGUI();

  private readonly scene: THREE.Scene = new THREE.Scene();
  private readonly raycaster = new THREE.Raycaster();

  private readonly screenSizeRepo: ScreenSizeRepo = new ScreenSizeRepo();

  private readonly camera: CustomPersepctiveCamera;
  private readonly renderer: CustomRenderer;
  private readonly controls: CustomOrbitControls;

  private readonly screenSizeTracker: ScreenSizeTracker;
  private readonly mouseTouchTracker: MouseTouchTracker;

  private cube: Nullable<IRubikCube<FaceNames>> = null;
  private rotationHelper: Nullable<IRubikCubeRotationHelper<FaceNames, RotationTypes>> = null;
  private rayCastingHelper: Nullable<IRubikCubeRayCastingHelper<FaceNames, RotationTypes>> = null;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new CustomPersepctiveCamera(this.screenSizeRepo);
    this.renderer = new CustomRenderer(canvas, this.screenSizeRepo);
    this.controls = new CustomOrbitControls(this.camera, canvas);

    this.screenSizeTracker = new ScreenSizeTracker(this.screenSizeRepo, this.camera, this.renderer);
    this.mouseTouchTracker = new MouseTouchTracker(this.screenSizeRepo);
  }

  public start(cubeFactory: IRubikCubeFactory<FaceNames, PieceCoverFaceName, RotationTypes>) {
    this.setUpDebugGUI();
    this.setUpCubeAndHelpers(cubeFactory);
    this.setUpScene();
    this.setUpTick();
  }

  private setUpDebugGUI(): void {
    this.gui.add(this.controls, 'enabled');
  }

  private setUpCubeAndHelpers(
    cubeFactory: IRubikCubeFactory<FaceNames, PieceCoverFaceName, RotationTypes>,
  ): void {
    this.cube = cubeFactory.createRubikCube();
    this.rotationHelper = cubeFactory.createRubikCubeRotationHelper();
    this.rayCastingHelper = cubeFactory.createRubikCubeRayCastingHelper();
  }

  private setUpScene(): void {
    if (!this.cube) {
      throw new Error('Cube was not loaded correctly!');
    }
    this.scene.add(this.camera);
    this.scene.add(...this.cube.pieces.map((piece) => piece.entirePiece));
  }

  private setUpTick(): void {
    console.log(this.cube);
    const tick = () => {
      if (!this.cube || !this.rayCastingHelper || !this.rotationHelper) {
        return;
      }

      this.raycaster.setFromCamera(this.mouseTouchTracker.pointerPosition, this.camera);

      if (!this.controls.enabled) {
        const intersects = this.raycaster.intersectObjects(
          this.cube.pieces.map((piece) => piece.entirePiece),
        );
        const rotationData = this.rayCastingHelper.checkIntersecton(this.cube, intersects[0]);
        if (rotationData) {
          this.rotationHelper.rotateCube(
            this.scene,
            this.cube,
            rotationData.face,
            rotationData.rotation,
          );
          console.log(rotationData, this.cube);
        }
      }

      this.controls.update();

      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
