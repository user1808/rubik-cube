import * as THREE from 'three';
import { ScreenSize, ScreenSizeTracker } from './common';
import { CustomPersepctiveCamera, CustomRenderer, CustomOrbitControls } from './common/custom';
import type { RubikCube } from './rubik-cube/classes/rubik-cube/structure/cube/rubik-cube';
import { RubikCubeBuilder } from './rubik-cube/classes/rubik-cube/helpers/cube/rubik-cube-builder';
import { RubikCubePieceLoader } from './rubik-cube/classes/rubik-cube/helpers/piece/rubik-cube-piece-loader';
import { RubikCubePieceBuilder } from './rubik-cube/classes/rubik-cube/helpers/piece/rubik-cube-piece-builder';
import type { IRubikCubeData } from './rubik-cube/interfaces/rubik-cube-data';

export class RubikCubeApp {
  private readonly scene: THREE.Scene = new THREE.Scene();

  private readonly screenSize: ScreenSize = new ScreenSize();
  private readonly screenSizeTracker: ScreenSizeTracker = new ScreenSizeTracker();

  private readonly camera: CustomPersepctiveCamera;
  private readonly renderer: CustomRenderer;
  private readonly controls: CustomOrbitControls;

  private pieceLoader: RubikCubePieceLoader = new RubikCubePieceLoader();
  private pieceBuilder: RubikCubePieceBuilder = new RubikCubePieceBuilder();
  private cubeBuilder: RubikCubeBuilder = new RubikCubeBuilder();
  private cube: Nullable<RubikCube> = null;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new CustomPersepctiveCamera(this.screenSize);
    this.renderer = new CustomRenderer(canvas, this.screenSize);
    this.screenSizeTracker.startTrack(this.screenSize, this.camera, this.renderer);
    this.controls = new CustomOrbitControls(this.camera, canvas);
  }

  public start(pieceName: string, cubeData: IRubikCubeData) {
    this.setUpCube(pieceName, cubeData);
  }

  private setUpCube(pieceName: string, cubeData: IRubikCubeData): void {
    // TODO: at the finish of the job you can remove it
    this.scene.add(new THREE.AxesHelper(5));

    this.pieceLoader.load(pieceName, (piece) => {
      this.cube = this.cubeBuilder.createCube(piece.scene, cubeData, this.pieceBuilder);
      this.setUpScene();
    });
  }

  private setUpScene(): void {
    if (!this.cube) {
      throw new Error('Piece was not loaded correctly!');
    }
    this.scene.add(this.camera);
    this.scene.add(this.cube);
    console.log(this.cube);
    this.setUpTick();
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
