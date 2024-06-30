import type { IRubikCubePieceWrapper } from '../structure';

export interface IRubikCubePiecesBuilder {
  buildPieces(): Array<IRubikCubePieceWrapper>;
}
