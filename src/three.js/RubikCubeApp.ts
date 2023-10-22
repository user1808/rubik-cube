import * as THREE from 'three';
import {
  CustomDebugGUI,
  CustomPersepctiveCamera,
  CustomRenderer,
  CustomOrbitControls,
} from './Common/Custom';
import { ScreenSizeRepo, ScreenSizeTracker, MouseTouchTracker } from './Common';
import { RubikCube3x3Factory } from './RubikCube/classes/RubikCube3x3/RubikCube3x3Factory';
import type { IRubikCube } from './RubikCube/interfaces/IRubikCube';
import type { IRubikCubeRayCastingHelper } from './RubikCube/interfaces/IRubikCubeRayCastingHelper';
import type { IRubikCubeRotationHelper } from './RubikCube/interfaces/IRubikCubeRotationHelper';
import type { TRubikCube3x3FaceNames } from './RubikCube/types/RubikCube3x3/TRubikCube3x3FaceNames';
import type { TRubikCube3x3RotationTypes } from './RubikCube/types/RubikCube3x3/TRubikCube3x3RotationTypes';

export class RubikCubeApp {
  private readonly gui: CustomDebugGUI = new CustomDebugGUI();

  private readonly scene: THREE.Scene = new THREE.Scene();
  private readonly raycaster = new THREE.Raycaster();

  private readonly screenSizeRepo: ScreenSizeRepo = new ScreenSizeRepo();

  private readonly camera: CustomPersepctiveCamera;
  private readonly renderer: CustomRenderer;
  private readonly controls: CustomOrbitControls;

  private readonly screenSizeTracker: ScreenSizeTracker;
  private readonly mouseTouchTracker: MouseTouchTracker;

  private cube: IRubikCube<TRubikCube3x3FaceNames, 'Cover'> | null = null;
  private rotationHelper: IRubikCubeRotationHelper<
    TRubikCube3x3FaceNames,
    'Cover',
    TRubikCube3x3RotationTypes
  > | null = null;
  private rayCastingHelper: IRubikCubeRayCastingHelper<
    TRubikCube3x3FaceNames,
    TRubikCube3x3RotationTypes
  > | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new CustomPersepctiveCamera(this.screenSizeRepo);
    this.renderer = new CustomRenderer(canvas, this.screenSizeRepo);
    this.controls = new CustomOrbitControls(this.camera, canvas);

    this.screenSizeTracker = new ScreenSizeTracker(this.screenSizeRepo, this.camera, this.renderer);
    this.mouseTouchTracker = new MouseTouchTracker(this.screenSizeRepo);
  }

  public start(loadedPiece: THREE.Group) {
    this.setUpDebugGUI();
    this.setUpCubeAndHelpers(loadedPiece);
    this.setUpScene();
    this.setUpTick();
  }

  private setUpDebugGUI(): void {
    this.gui.add(this.controls, 'enabled');
  }

  private setUpCubeAndHelpers(loadedPiece: THREE.Group): void {
    const cubeFactory = new RubikCube3x3Factory(loadedPiece);

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
    const tick = () => {
      if (!this.cube || !this.rayCastingHelper || !this.rotationHelper) {
        return;
      }

      this.raycaster.setFromCamera(this.mouseTouchTracker.pointerPosition, this.camera);

      if (!this.controls.enabled) {
        const intersects = this.raycaster.intersectObjects(
          this.cube.pieces.map((piece) => piece.entirePiece),
        );
        const rotationData = this.rayCastingHelper.checkIntersecton(intersects[0]);
        if (rotationData) {
          this.rotationHelper.rotateCube(
            this.scene,
            this.cube,
            rotationData.face,
            rotationData.rotation,
          );
        }
      }

      this.controls.update();

      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
