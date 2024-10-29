import * as THREE from 'three';
import type { IRubikCubePieceFace } from './rubik-cube-piece-face';
import type { TCubeFaceColor, TPieceId } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { RubikCubePieceVisibleFace } from '@/rubik-cube-app/rubik-cube/classes/rubik-cube/structure/piece/rubik-cube-piece-visible-face';

export interface IRubikCubePiece<TCubeFacesNames extends string> extends THREE.Group {
  readonly pieceId: TPieceId;
  readonly pieceAllFaces: Array<IRubikCubePieceFace>;
  readonly pieceVisibleFaces: Array<RubikCubePieceVisibleFace<TCubeFacesNames>>;

  readonly pieceCubeFacesColors: Record<TCubeFacesNames, Nullable<TCubeFaceColor>>;

  dispose(): void;
}
