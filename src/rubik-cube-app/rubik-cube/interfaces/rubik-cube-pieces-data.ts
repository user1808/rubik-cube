import type { TPieceData } from '../types/rubik-cube/piece-data';

export interface IRubikCubePiecesData<TPiecesFilenames extends string> {
  get piecesFilenames(): Array<TPiecesFilenames>;
  get piecesData(): Array<TPieceData<TPiecesFilenames>>;
}
