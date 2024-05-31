import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';
import { AbstractRubikHexahedronPiecesData } from '../pieces-data';

export class RubikHexahedron3x3PiecesData extends AbstractRubikHexahedronPiecesData<THexahedron3x3RotationGroups> {
  public override get piecesIdxsForRotationGroups(): Record<
    THexahedron3x3RotationGroups,
    Array<number>
  > {
    return {
      Front: [6, 7, 8, 14, 15, 16, 23, 24, 25],
      Back: [2, 1, 0, 11, 10, 9, 19, 18, 17],
      Right: [8, 5, 2, 16, 13, 11, 25, 22, 19],
      Left: [0, 3, 6, 9, 12, 14, 17, 20, 23],
      Up: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      Down: [23, 24, 25, 20, 21, 22, 17, 18, 19],
      XSlice: [7, 4, 1, 15, 10, 24, 21, 18],
      YSlice: [9, 10, 11, 12, 13, 14, 15, 16],
      ZSlice: [3, 4, 5, 12, 13, 20, 21, 22],
    };
  }
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
