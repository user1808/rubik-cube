import type { THexahedron4x4RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/rotation-groups';
import type { TPieceDataIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  AbstractRubikHexahedronPiecesData,
  type THexahedronPositionValues,
  type THexahedronSize,
} from '../pieces-data';

export class RubikHexahedron4x4PiecesData extends AbstractRubikHexahedronPiecesData<THexahedron4x4RotationGroups> {
  public override get rotationGroupsPiecesIdxs(): Record<
    THexahedron4x4RotationGroups,
    Array<TPieceDataIdx>
  > {
    return {
      Front: [12, 13, 14, 15, 24, 25, 26, 27, 36, 37, 38, 39, 52, 53, 54, 55],
      Back: [3, 2, 1, 0, 19, 18, 17, 16, 31, 30, 29, 28, 43, 42, 41, 40],
      Right: [15, 11, 7, 3, 27, 23, 21, 19, 39, 35, 33, 31, 55, 51, 47, 43],
      Left: [0, 4, 8, 12, 16, 20, 22, 24, 28, 32, 34, 36, 40, 44, 48, 52],
      Up: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      Down: [52, 53, 54, 55, 48, 49, 50, 51, 44, 45, 46, 47, 40, 41, 42, 43],
      FrontSlice: [8, 9, 10, 11, 22, 23, 34, 35, 48, 49, 50, 51],
      BackSlice: [7, 6, 5, 4, 21, 20, 33, 32, 47, 46, 45, 44],
      RightSlice: [14, 10, 6, 2, 26, 18, 38, 30, 54, 50, 46, 42],
      LeftSlice: [1, 5, 9, 13, 17, 25, 29, 37, 41, 45, 49, 53],
      UpSlice: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
      DownSlice: [36, 37, 38, 39, 34, 35, 32, 33, 28, 29, 30, 31],
    };
  }

  protected override readonly size: THexahedronSize = 4;

  protected override readonly positionValues: THexahedronPositionValues = {
    x: [-1.5, -0.5, 0.5, 1.5],
    y: [1.5, 0.5, -0.5, -1.5],
    z: [-1.5, -0.5, 0.5, 1.5],
  };
}
