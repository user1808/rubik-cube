import { RubikHexahedronPiecesData } from '../pieces-data';

export class RubikHexahedron4x4PiecesData extends RubikHexahedronPiecesData {
  protected override get size(): number {
    return 4;
  }
  protected override get positionValues(): Record<'x' | 'y' | 'z', number[]> {
    return {
      x: [-1.5, -0.5, 0.5, 1.5],
      y: [1.5, 0.5, -0.5, -1.5],
      z: [-1.5, -0.5, 0.5, 1.5],
    };
  }
}
