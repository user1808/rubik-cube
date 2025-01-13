import { Vector3 } from 'three';
import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { AbstractRubikHexahedronRotationData } from '../rotation-data';

export class RubikHexahedron5x5RotationData extends AbstractRubikHexahedronRotationData<THexahedron5x5RotationGroups> {
  public override readonly rotationGroupsNormalVectors: Record<
    THexahedron5x5RotationGroups,
    Vector3
  > = {
    Front: new Vector3(0, 0, 1),
    Back: new Vector3(0, 0, -1),
    Right: new Vector3(1, 0, 0),
    Left: new Vector3(-1, 0, 0),
    Up: new Vector3(0, 1, 0),
    Down: new Vector3(0, -1, 0),
    FrontSlice: new Vector3(0, 0, 1),
    BackSlice: new Vector3(0, 0, -1),
    RightSlice: new Vector3(1, 0, 0),
    LeftSlice: new Vector3(-1, 0, 0),
    UpSlice: new Vector3(0, 1, 0),
    DownSlice: new Vector3(0, -1, 0),
    SliceX: new Vector3(1, 0, 0),
    SliceY: new Vector3(0, 1, 0),
    SliceZ: new Vector3(0, 0, 1),
  };
  public override readonly rotationPiecesChangesPatterns: Record<
    THexahedronRotationTypes,
    Record<THexahedron5x5RotationGroups, Array<number>>
  > = {
    Clockwise: {
      Front: [
        20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 12, 7, 2, 23, 18, 13, 8, 3, 24, 19, 14, 9, 4,
      ],
      Back: [
        20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 12, 7, 2, 23, 18, 13, 8, 3, 24, 19, 14, 9, 4,
      ],
      Right: [
        20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 12, 7, 2, 23, 18, 13, 8, 3, 24, 19, 14, 9, 4,
      ],
      Left: [
        20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 12, 7, 2, 23, 18, 13, 8, 3, 24, 19, 14, 9, 4,
      ],
      Up: [
        20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 12, 7, 2, 23, 18, 13, 8, 3, 24, 19, 14, 9, 4,
      ],
      Down: [
        20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17, 12, 7, 2, 23, 18, 13, 8, 3, 24, 19, 14, 9, 4,
      ],
      FrontSlice: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
      BackSlice: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
      RightSlice: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
      LeftSlice: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
      UpSlice: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
      DownSlice: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
      SliceX: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
      SliceY: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
      SliceZ: [11, 9, 7, 5, 0, 12, 1, 13, 2, 14, 3, 15, 10, 8, 6, 4],
    },
    CounterClockwise: {
      Front: [
        4, 9, 14, 19, 24, 3, 8, 13, 18, 23, 2, 7, 12, 17, 22, 1, 6, 11, 16, 21, 0, 5, 10, 15, 20,
      ],
      Back: [
        4, 9, 14, 19, 24, 3, 8, 13, 18, 23, 2, 7, 12, 17, 22, 1, 6, 11, 16, 21, 0, 5, 10, 15, 20,
      ],
      Right: [
        4, 9, 14, 19, 24, 3, 8, 13, 18, 23, 2, 7, 12, 17, 22, 1, 6, 11, 16, 21, 0, 5, 10, 15, 20,
      ],
      Left: [
        4, 9, 14, 19, 24, 3, 8, 13, 18, 23, 2, 7, 12, 17, 22, 1, 6, 11, 16, 21, 0, 5, 10, 15, 20,
      ],
      Up: [
        4, 9, 14, 19, 24, 3, 8, 13, 18, 23, 2, 7, 12, 17, 22, 1, 6, 11, 16, 21, 0, 5, 10, 15, 20,
      ],
      Down: [
        4, 9, 14, 19, 24, 3, 8, 13, 18, 23, 2, 7, 12, 17, 22, 1, 6, 11, 16, 21, 0, 5, 10, 15, 20,
      ],
      FrontSlice: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
      BackSlice: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
      RightSlice: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
      LeftSlice: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
      UpSlice: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
      DownSlice: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
      SliceX: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
      SliceY: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
      SliceZ: [4, 6, 8, 10, 15, 3, 14, 2, 13, 1, 12, 0, 5, 7, 9, 11],
    },
    Double: {
      Front: [
        24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      ],
      Back: [
        24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      ],
      Right: [
        24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      ],
      Left: [
        24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      ],
      Up: [
        24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      ],
      Down: [
        24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      ],
      FrontSlice: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      BackSlice: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      RightSlice: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      LeftSlice: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      UpSlice: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      DownSlice: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      SliceX: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      SliceY: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      SliceZ: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    },
  };
}
