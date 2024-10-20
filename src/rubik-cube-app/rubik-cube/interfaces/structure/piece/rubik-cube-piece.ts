import * as THREE from 'three';
import type { IRubikCubePieceFace } from './rubik-cube-piece-face';
import type { TPieceId } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { RubikCubePieceVisibleFace } from '@/rubik-cube-app/rubik-cube/classes/rubik-cube/structure/piece/rubik-cube-piece-visible-face';

export interface IRubikCubePiece extends THREE.Group {
  readonly pieceId: TPieceId;
  readonly pieceAllFaces: Array<IRubikCubePieceFace>;
  readonly pieceVisibleFaces: Array<RubikCubePieceVisibleFace>;

  dispose(): void;
}
