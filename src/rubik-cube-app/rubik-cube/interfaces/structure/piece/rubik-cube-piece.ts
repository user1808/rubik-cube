import * as THREE from 'three';
import type { IRubikCubePieceFace } from './rubik-cube-piece-face';

export interface IRubikCubePiece extends THREE.Group {
  get pieceId(): number;
  get pieceFaces(): Array<IRubikCubePieceFace>;

  dispose(): void;
}
