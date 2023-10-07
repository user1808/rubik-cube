import * as THREE from 'three';
import type { IRubikCube } from '../../interfaces/IRubikCube';

export abstract class RubikCubeCreator<
  FaceNames extends string,
  PieceCoverFaceName extends string,
> {
  abstract createRubikCube(): IRubikCube<FaceNames, PieceCoverFaceName>;
  addRubikCubeToScene(scene: THREE.Scene) {
    const rubikCube = this.createRubikCube();
    scene.add(...rubikCube.pieces.map((piece) => piece.entirePiece));
  }
}
