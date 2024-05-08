import { RubikHexahedronPiecesData } from '../pieces-data';

export class RubikHexahedron2x2PiecesData extends RubikHexahedronPiecesData {
  protected override get size(): number {
    return 2;
  }
  protected override get positionValues(): Record<'x' | 'y' | 'z', number[]> {
    return {
      x: [-0.5, 0.5],
      y: [0.5, -0.5],
      z: [-0.5, 0.5],
    };
  }
}
