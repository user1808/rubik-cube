import * as THREE from 'three';
import type { RubikCubePieceFace } from './rubik-cube-piece-face';
import type { IRubikCubePiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { TPieceId } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubePiece extends THREE.Group implements IRubikCubePiece {
  constructor(
    public readonly pieceId: TPieceId,
    public readonly pieceFaces: Array<RubikCubePieceFace>,
  ) {
    super();
    this.add(...pieceFaces);
  }

  public dispose() {
    this.pieceFaces.forEach((face) => face.dispose());
  }
}
