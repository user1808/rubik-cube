import { Vector3 } from 'three';
import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { AbstractRubikHexahedronRotationData } from '../rotation-data';

export class RubikHexahedron3x3RotationData extends AbstractRubikHexahedronRotationData<THexahedron3x3RotationGroups> {
  public override readonly rotationGroupsNormalVectors: Record<
    THexahedron3x3RotationGroups,
    Vector3
  > = {
    Front: new Vector3(0, 0, 1),
    Back: new Vector3(0, 0, -1),
    Right: new Vector3(1, 0, 0),
    Left: new Vector3(-1, 0, 0),
    Up: new Vector3(0, 1, 0),
    Down: new Vector3(0, -1, 0),
    SliceX: new Vector3(1, 0, 0),
    SliceY: new Vector3(0, 1, 0),
    SliceZ: new Vector3(0, 0, 1),
  };

  public override readonly rotationPiecesChangesPatterns: Record<
    THexahedronRotationTypes,
    Record<THexahedron3x3RotationGroups, Array<number>>
  > = {
    Clockwise: {
      Front: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Back: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Right: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Left: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Up: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      Down: [6, 3, 0, 7, 4, 1, 8, 5, 2],
      SliceX: [5, 3, 0, 6, 1, 7, 4, 2],
      SliceY: [5, 3, 0, 6, 1, 7, 4, 2],
      SliceZ: [5, 3, 0, 6, 1, 7, 4, 2],
    },
    CounterClockwise: {
      Front: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Back: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Right: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Left: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Up: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      Down: [2, 5, 8, 1, 4, 7, 0, 3, 6],
      SliceX: [2, 4, 7, 1, 6, 0, 3, 5],
      SliceY: [2, 4, 7, 1, 6, 0, 3, 5],
      SliceZ: [2, 4, 7, 1, 6, 0, 3, 5],
    },
    Double: {
      Front: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Back: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Right: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Left: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Up: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      Down: [8, 7, 6, 5, 4, 3, 2, 1, 0],
      SliceX: [7, 6, 5, 4, 3, 2, 1, 0],
      SliceY: [7, 6, 5, 4, 3, 2, 1, 0],
      SliceZ: [7, 6, 5, 4, 3, 2, 1, 0],
    },
  };
}
