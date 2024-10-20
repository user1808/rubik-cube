import * as THREE from 'three';
import type { RubikCubePieceFace } from './rubik-cube-piece-face';
import type { IRubikCubePiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TPieceId } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { RubikCubePieceVisibleFace } from './rubik-cube-piece-visible-face';

export class RubikCubePiece extends THREE.Group implements IRubikCubePiece {
  constructor(
    public readonly pieceId: TPieceId,
    public readonly pieceAllFaces: Array<RubikCubePieceFace>,
    public readonly pieceVisibleFaces: Array<RubikCubePieceVisibleFace>,
  ) {
    super();
    this.add(...pieceAllFaces);
  }

  public dispose() {
    this.pieceAllFaces.forEach((face) => face.dispose());
  }
}
