import * as THREE from 'three';
import { CustomPersepctiveCamera, CustomRenderer, CustomOrbitControls } from './Common/Custom';
import { ScreenSize, ScreenSizeTracker } from './Common';
import type { RubikCubePiece } from './RubikCube/classes/RubikCube/RubikCubeStructure/RubikCubePiece/RubikCubePiece';
import { RubikCubePieceLoader } from './RubikCube/classes/RubikCube/RubikCubeHelpers/RubikCubePieceLoader';
import { RubikCubePieceBuilder } from './RubikCube/classes/RubikCube/RubikCubeHelpers/RubikCubePieceBuilder';

export class RubikCubeApp<TRubikCubePiecesNames extends string = string> {
  private readonly scene: THREE.Scene = new THREE.Scene();

  private readonly screenSize: ScreenSize = new ScreenSize();
  private readonly screenSizeTracker: ScreenSizeTracker = new ScreenSizeTracker();

  private readonly camera: CustomPersepctiveCamera;
  private readonly renderer: CustomRenderer;
  private readonly controls: CustomOrbitControls;

  private pieceLoader: RubikCubePieceLoader<TRubikCubePiecesNames> = new RubikCubePieceLoader();
  private pieceBuilder: RubikCubePieceBuilder = new RubikCubePieceBuilder();
  private piece: Nullable<RubikCubePiece> = null;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new CustomPersepctiveCamera(this.screenSize);
    this.renderer = new CustomRenderer(canvas, this.screenSize);
    this.screenSizeTracker.startTrack(this.screenSize, this.camera, this.renderer);
    this.controls = new CustomOrbitControls(this.camera, canvas);
  }

  public start(pieceName: TRubikCubePiecesNames) {
    this.setUpPiece(pieceName);
  }

  private setUpPiece(pieceName: TRubikCubePiecesNames): void {
    // TODO: at the finish of the job you can remove it
    this.scene.add(new THREE.AxesHelper(5));

    this.pieceLoader.load(pieceName, (loadedData) => {
      this.piece = this.pieceBuilder.createPiece(loadedData.scene);
      this.setUpScene();
    });
  }

  private setUpScene(): void {
    if (!this.piece) {
      throw new Error('Piece was not loaded correctly!');
    }
    this.scene.add(this.camera);
    this.scene.add(this.piece);
    console.log(this.piece);
    this.setUpTick();
  }

  private setUpTick(): void {
    const tick = () => {
      if (!this.piece) {
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
