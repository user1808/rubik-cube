import * as THREE from 'three';
import type { IRubikCubePieceFace } from './rubik-cube-piece-face';
import type { TPieceId } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export interface IRubikCubePiece extends THREE.Group {
  readonly pieceId: TPieceId;
  readonly pieceFaces: Array<IRubikCubePieceFace>;

  dispose(): void;
}
