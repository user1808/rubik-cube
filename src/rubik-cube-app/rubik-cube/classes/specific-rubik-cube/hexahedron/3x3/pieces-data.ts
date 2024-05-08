import { RubikHexahedronPiecesData } from '../pieces-data';

export class RubikHexahedron3x3PiecesData extends RubikHexahedronPiecesData {
  protected override get size(): number {
    return 3;
  }
  protected override get positionValues(): Record<'x' | 'y' | 'z', number[]> {
    return {
      x: [-1, 0, 1],
      y: [1, 0, -1],
      z: [-1, 0, 1],
    };
  }
}
