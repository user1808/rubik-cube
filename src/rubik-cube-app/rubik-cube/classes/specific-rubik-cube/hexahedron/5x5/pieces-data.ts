import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { TPieceDataIdx } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import {
  AbstractRubikHexahedronPiecesData,
  type THexahedronPositionValues,
  type THexahedronSize,
} from '../pieces-data';

export class RubikHexahedron5x5PiecesData extends AbstractRubikHexahedronPiecesData<THexahedron5x5RotationGroups> {
  public override readonly rotationGroupsPiecesIdxs: Record<
    THexahedron5x5RotationGroups,
    Array<TPieceDataIdx>
  > = {
    Front: [
      20, 21, 22, 23, 24, 36, 37, 38, 39, 40, 52, 53, 54, 55, 56, 68, 69, 70, 71, 72, 93, 94, 95,
      96, 97,
    ],
    Back: [
      4, 3, 2, 1, 0, 29, 28, 27, 26, 25, 45, 44, 43, 42, 41, 61, 60, 59, 58, 57, 77, 76, 75, 74, 73,
    ],
    Right: [
      24, 19, 14, 9, 4, 40, 35, 33, 31, 29, 56, 51, 49, 47, 45, 72, 67, 65, 63, 61, 97, 92, 87, 82,
      77,
    ],
    Left: [
      0, 5, 10, 15, 20, 25, 30, 32, 34, 36, 41, 46, 48, 50, 52, 57, 62, 64, 66, 68, 73, 78, 83, 88,
      93,
    ],
    Up: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    Down: [
      93, 94, 95, 96, 97, 88, 89, 90, 91, 92, 83, 84, 85, 86, 87, 78, 79, 80, 81, 82, 73, 74, 75,
      76, 77,
    ],
    FrontSlice: [15, 16, 17, 18, 19, 34, 35, 50, 51, 66, 67, 88, 89, 90, 91, 92],
    BackSlice: [9, 8, 7, 6, 5, 31, 30, 47, 46, 63, 62, 82, 81, 80, 79, 78],
    RightSlice: [23, 18, 13, 8, 3, 39, 28, 55, 44, 71, 60, 96, 91, 86, 81, 76],
    LeftSlice: [1, 6, 11, 16, 21, 26, 37, 42, 53, 58, 69, 74, 79, 84, 89, 94],
    UpSlice: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    DownSlice: [68, 69, 70, 71, 72, 66, 67, 64, 65, 62, 63, 57, 58, 59, 60, 61],
    SliceX: [22, 17, 12, 7, 2, 38, 27, 54, 43, 70, 59, 95, 90, 85, 80, 75],
    SliceY: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
    SliceZ: [10, 11, 12, 13, 14, 32, 33, 48, 49, 64, 65, 83, 84, 85, 86, 87],
  };

  protected override readonly size: THexahedronSize = 5;

  protected override readonly positionValues: THexahedronPositionValues = {
    x: [-2, -1, 0, 1, 2],
    y: [2, 1, 0, -1, -2],
    z: [-2, -1, 0, 1, 2],
  };
}
