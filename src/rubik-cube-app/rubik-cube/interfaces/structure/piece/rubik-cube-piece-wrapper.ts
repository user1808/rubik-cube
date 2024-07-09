import type { IRubikCubePiece } from './rubik-cube-piece';

export interface IRubikCubePieceWrapper {
  get piece(): IRubikCubePiece;
}
