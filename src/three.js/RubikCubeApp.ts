import * as THREE from 'three';
import {
  CustomDebugGUI,
  CustomPersepctiveCamera,
  CustomRenderer,
  CustomOrbitControls,
} from './Common/Custom';
import { ScreenSizeRepo, ScreenSizeTracker, MouseTouchTracker } from './Common';
import type { RubikCube } from './RubikCube/classes/RubikCube/RubikCube';
import type { AbstractRubikCubeFactory } from './RubikCube/classes/AbstractRubikCube/AbstractRubikCubeFactory';

export class RubikCubeApp<
  RealFacesNames extends string = string,
  PseudoFacesNames extends string | never = string | never,
  PieceCoverFacesNames extends string = string,
  RotationTypes extends string = string,
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

  private cube: Nullable<RubikCube<RealFacesNames | PseudoFacesNames, RotationTypes>> = null;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new CustomPersepctiveCamera(this.screenSizeRepo);
    this.renderer = new CustomRenderer(canvas, this.screenSizeRepo);
    this.controls = new CustomOrbitControls(this.camera, canvas);

    this.screenSizeTracker = new ScreenSizeTracker(this.screenSizeRepo, this.camera, this.renderer);
    this.mouseTouchTracker = new MouseTouchTracker(this.screenSizeRepo);
  }

  public start(
    loadedPiece: THREE.Group,
    cubeFactory: AbstractRubikCubeFactory<
      RealFacesNames,
      PseudoFacesNames,
      PieceCoverFacesNames,
      RotationTypes
    >,
  ) {
    this.setUpCube(loadedPiece, cubeFactory);
    this.setUpDebugGUI(cubeFactory.allFacesNamesArray, cubeFactory.rotationTypesArray);
    this.setUpScene();
    this.setUpTick();
  }

  private setUpCube(
    loadedPiece: THREE.Group,
    cubeFactory: AbstractRubikCubeFactory<
      RealFacesNames,
      PseudoFacesNames,
      PieceCoverFacesNames,
      RotationTypes
    >,
  ): void {
    this.cube = cubeFactory.createRubikCube(loadedPiece, this.scene);
  }

  private setUpDebugGUI(
    allFacesNames: Readonly<Array<RealFacesNames | PseudoFacesNames>>,
    rotationTypes: Readonly<Array<RotationTypes>>,
  ): void {
    const rotationGUIFolder = this.gui.addFolder('Rotation Cube Face');
    rotationGUIFolder.add(this.controls, 'enabled').name('Controls Enabled');
    const rotationData: { face: RealFacesNames | PseudoFacesNames; rotationType: RotationTypes } = {
      face: allFacesNames[0],
      rotationType: rotationTypes[0],
    };
    const rotationFunction = {
      rotateCubeFace: () => {
        this.cube?.rotateCubeFace(rotationData.face, rotationData.rotationType, () => {
          console.log(this.cube?.facesValues);
        });
      },
    };
    rotationGUIFolder.add(rotationData, 'face', allFacesNames).name('Face To Rotate');
    rotationGUIFolder.add(rotationData, 'rotationType', rotationTypes).name('Rotation Type');
    rotationGUIFolder.add(rotationFunction, 'rotateCubeFace').name('Rotate Cube Face');
    if (this.cube) {
      const cubeOnSceneGUIFolder = this.gui.addFolder('Cube On Scene');
      cubeOnSceneGUIFolder.add(this.cube, 'addToScene').name('Add Cube To Scene');
      cubeOnSceneGUIFolder.add(this.cube, 'removeFromScene').name('Remove Cube From Scene');
    }
  }

  private setUpScene(): void {
    if (!this.cube) {
      throw new Error('Cube was not loaded correctly!');
    }
    this.scene.add(this.camera);
    this.cube.addToScene();
  }

  private setUpTick(): void {
    const tick = () => {
      if (!this.cube) {
        window.requestAnimationFrame(tick);
        return;
      }

      this.raycaster.setFromCamera(this.mouseTouchTracker.pointerPosition, this.camera);

      this.controls.update();

      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
