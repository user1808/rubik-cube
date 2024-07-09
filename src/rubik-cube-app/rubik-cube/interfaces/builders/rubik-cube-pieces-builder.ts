import type { TCubePieces } from '../../types/rubik-cube';

export interface IRubikCubePiecesBuilder {
  buildPieces(): TCubePieces;
}
