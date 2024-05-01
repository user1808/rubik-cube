import { RubikHexahedronPiecesData } from '../pieces-data';

export class RubikHexahedron5x5PiecesData extends RubikHexahedronPiecesData {
  protected override get size(): number {
    return 5;
  }
  protected override get positionValues(): Record<'x' | 'y' | 'z', number[]> {
    return {
      x: [-2, -1, 0, 1, 2],
      y: [2, 1, 0, -1, -2],
      z: [-2, -1, 0, 1, 2],
    };
  }
}
