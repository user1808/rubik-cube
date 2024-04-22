import * as THREE from 'three';
import { CustomPersepctiveCamera, CustomRenderer, CustomOrbitControls } from './Common/Custom';
import { ScreenSize, ScreenSizeTracker } from './Common';
import type { RubikCube } from './RubikCube/classes/RubikCube/RubikCubeStructure/RubikCube';
import type { RubikCubeFactory } from './RubikCube/classes/RubikCube/RubikCubeHelpers/RubikCubeFactory';

export class RubikCubeApp<
  RealFacesNames extends string = string,
  PseudoFacesNames extends string | never = string | never,
  EdgeFacesNames extends string = string,
  RotationTypes extends string = string,
> {
  private readonly scene: THREE.Scene = new THREE.Scene();

  private readonly screenSize: ScreenSize = new ScreenSize();
  private readonly screenSizeTracker: ScreenSizeTracker = new ScreenSizeTracker();

  private readonly camera: CustomPersepctiveCamera;
  private readonly renderer: CustomRenderer;
  private readonly controls: CustomOrbitControls;

  private cube: Nullable<RubikCube<RealFacesNames | PseudoFacesNames, RotationTypes>> = null;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new CustomPersepctiveCamera(this.screenSize);
    this.renderer = new CustomRenderer(canvas, this.screenSize);
    this.screenSizeTracker.startTrack(this.screenSize, this.camera, this.renderer);
    this.controls = new CustomOrbitControls(this.camera, canvas);
  }

  public start(
    loadedPiece: THREE.Group,
    cubeFactory: RubikCubeFactory<RealFacesNames, PseudoFacesNames, EdgeFacesNames>,
  ) {
    this.setUpCube(loadedPiece, cubeFactory);
    this.setUpScene();
    this.setUpTick();
  }

  private setUpCube(
    loadedPiece: THREE.Group,
    cubeFactory: RubikCubeFactory<RealFacesNames, PseudoFacesNames, EdgeFacesNames>,
  ): void {
    this.cube = cubeFactory.createRubikCube(loadedPiece, this.scene);
  }

  private setUpScene(): void {
    if (!this.cube) {
      throw new Error('Cube was not loaded correctly!');
    }
    this.scene.add(this.camera);
    this.cube.addToScene(this.scene);
  }

  private setUpTick(): void {
    const tick = () => {
      if (!this.cube) {
        window.requestAnimationFrame(tick);
        return;
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
