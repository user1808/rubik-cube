import type { TCubePieces } from '../../types/rubik-cube';

export interface IRubikCubePiecesBuilder<TCubeFacesNames extends string> {
  buildPieces(): Promise<TCubePieces<TCubeFacesNames>>;
}
