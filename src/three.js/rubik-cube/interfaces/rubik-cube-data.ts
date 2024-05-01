import type { TPieceData } from '../types/rubik-cube/piece-data';

export interface IRubikCubeData {
  get piecesData(): Array<TPieceData>;
}
