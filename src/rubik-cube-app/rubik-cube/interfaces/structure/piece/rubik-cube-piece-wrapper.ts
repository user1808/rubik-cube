import type { IRubikCubePiece } from './rubik-cube-piece';

export interface IRubikCubePieceWrapper<TCubeFacesNames extends string> {
  readonly piece: IRubikCubePiece<TCubeFacesNames>;
}
