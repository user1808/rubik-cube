import { Vector3 } from 'three';
import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import { AbstractRubikHexahedronRotationData } from '../rotation-data';

export class RubikHexahedron2x2RotationData extends AbstractRubikHexahedronRotationData<THexahedron2x2RotationGroups> {
  public override readonly rotationGroupsNormalVectors: Record<
    THexahedron2x2RotationGroups,
    Vector3
  > = {
    Front: new Vector3(0, 0, 1),
    Back: new Vector3(0, 0, -1),
    Right: new Vector3(1, 0, 0),
    Left: new Vector3(-1, 0, 0),
    Up: new Vector3(0, 1, 0),
    Down: new Vector3(0, -1, 0),
  };
  public override readonly rotationPiecesChangesPatterns: Record<
    THexahedronRotationTypes,
    Record<THexahedron2x2RotationGroups, Array<number>>
  > = {
    Clockwise: {
      Front: [2, 0, 3, 1],
      Back: [2, 0, 3, 1],
      Right: [2, 0, 3, 1],
      Left: [2, 0, 3, 1],
      Up: [2, 0, 3, 1],
      Down: [2, 0, 3, 1],
    },
    CounterClockwise: {
      Front: [1, 3, 0, 2],
      Back: [1, 3, 0, 2],
      Right: [1, 3, 0, 2],
      Left: [1, 3, 0, 2],
      Up: [1, 3, 0, 2],
      Down: [1, 3, 0, 2],
    },
  };
  public override readonly rotationGroupsFaceChangesPatterns: Record<
    THexahedronRotationTypes,
    Record<THexahedron2x2RotationGroups, Array<[THexahedron2x2RotationGroups, Array<number>]>>
  > = {
    Clockwise: {
      Front: [
        ['Up', [2, 3]],
        ['Right', [0, 2]],
        ['Down', [1, 0]],
        ['Left', [3, 1]],
      ],
      Back: [
        ['Up', [1, 0]],
        ['Left', [0, 2]],
        ['Down', [2, 3]],
        ['Right', [3, 1]],
      ],
      Right: [
        ['Up', [3, 1]],
        ['Back', [0, 2]],
        ['Down', [3, 1]],
        ['Front', [3, 1]],
      ],
      Left: [
        ['Up', [0, 2]],
        ['Front', [0, 2]],
        ['Down', [0, 2]],
        ['Back', [3, 1]],
      ],
      Up: [
        ['Back', [1, 0]],
        ['Right', [1, 0]],
        ['Front', [1, 0]],
        ['Left', [1, 0]],
      ],
      Down: [
        ['Front', [2, 3]],
        ['Right', [2, 3]],
        ['Back', [2, 3]],
        ['Left', [2, 3]],
      ],
    },
    CounterClockwise: {
      Front: [
        ['Up', [3, 2]],
        ['Left', [1, 3]],
        ['Down', [0, 1]],
        ['Right', [2, 0]],
      ],
      Back: [
        ['Up', [0, 1]],
        ['Right', [1, 3]],
        ['Down', [3, 2]],
        ['Left', [2, 0]],
      ],
      Right: [
        ['Up', [1, 3]],
        ['Front', [1, 3]],
        ['Down', [1, 3]],
        ['Back', [2, 0]],
      ],
      Left: [
        ['Up', [2, 0]],
        ['Back', [1, 3]],
        ['Down', [2, 0]],
        ['Front', [2, 0]],
      ],
      Up: [
        ['Back', [0, 1]],
        ['Left', [0, 1]],
        ['Front', [0, 1]],
        ['Right', [0, 1]],
      ],
      Down: [
        ['Front', [3, 2]],
        ['Left', [3, 2]],
        ['Back', [3, 2]],
        ['Right', [3, 2]],
      ],
    },
  };
  public override readonly rotationGroupsNotation: Record<THexahedron2x2RotationGroups, string> = {
    Front: 'F',
    Back: 'B',
    Right: 'R',
    Left: 'L',
    Up: 'U',
    Down: 'D',
  };
  public override readonly rotationTypesNotation: Record<THexahedronRotationTypes, string> = {
    Clockwise: '',
    CounterClockwise: "'",
  };
}
