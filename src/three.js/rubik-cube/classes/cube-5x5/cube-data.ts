import type { IRubikCubeData } from '../../interfaces/rubik-cube-data';
import type { TPieceData } from '../../types/rubik-cube/piece-data';

export class RubikCube5x5Data implements IRubikCubeData {
  get piecesData(): Array<TPieceData> {
    throw new Error('Method not implemented.');
  }
}
