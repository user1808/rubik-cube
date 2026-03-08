import type { IRubikCubeLogicalRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces';
import type { THexahedron2x2RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/2x2/rotation-groups';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';

export class Hexahedron2x2LogicalRotationImplementation
  implements
    IRubikCubeLogicalRotationImplementation<
      THexahedronFaces,
      THexahedron2x2RotationGroups,
      THexahedronRotationTypes
    >
{
  private readonly data: Record<
    THexahedron2x2RotationGroups,
    Record<
      THexahedronRotationTypes,
      { ring: Array<[THexahedron2x2RotationGroups, Array<number>]>; face: Array<number> }
    >
  > = {
    Front: {
      Clockwise: {
        ring: [
          ['Up', [2, 3]],
          ['Right', [0, 2]],
          ['Down', [1, 0]],
          ['Left', [3, 1]],
        ],
        face: [2, 0, 3, 1],
      },
      CounterClockwise: {
        ring: [
          ['Up', [3, 2]],
          ['Left', [1, 3]],
          ['Down', [0, 1]],
          ['Right', [2, 0]],
        ],
        face: [1, 3, 0, 2],
      },
    },
    Back: {
      Clockwise: {
        ring: [
          ['Up', [1, 0]],
          ['Left', [0, 2]],
          ['Down', [2, 3]],
          ['Right', [3, 1]],
        ],
        face: [2, 0, 3, 1],
      },
      CounterClockwise: {
        ring: [
          ['Up', [0, 1]],
          ['Right', [1, 3]],
          ['Down', [3, 2]],
          ['Left', [2, 0]],
        ],
        face: [1, 3, 0, 2],
      },
    },
    Right: {
      Clockwise: {
        ring: [
          ['Up', [3, 1]],
          ['Back', [0, 2]],
          ['Down', [3, 1]],
          ['Front', [3, 1]],
        ],
        face: [2, 0, 3, 1],
      },
      CounterClockwise: {
        ring: [
          ['Up', [1, 3]],
          ['Front', [1, 3]],
          ['Down', [1, 3]],
          ['Back', [2, 0]],
        ],
        face: [1, 3, 0, 2],
      },
    },
    Left: {
      Clockwise: {
        ring: [
          ['Up', [0, 2]],
          ['Front', [0, 2]],
          ['Down', [0, 2]],
          ['Back', [3, 1]],
        ],
        face: [2, 0, 3, 1],
      },
      CounterClockwise: {
        ring: [
          ['Up', [2, 0]],
          ['Back', [1, 3]],
          ['Down', [2, 0]],
          ['Front', [2, 0]],
        ],
        face: [1, 3, 0, 2],
      },
    },
    Up: {
      Clockwise: {
        ring: [
          ['Back', [1, 0]],
          ['Right', [1, 0]],
          ['Front', [1, 0]],
          ['Left', [1, 0]],
        ],
        face: [2, 0, 3, 1],
      },
      CounterClockwise: {
        ring: [
          ['Back', [0, 1]],
          ['Left', [0, 1]],
          ['Front', [0, 1]],
          ['Right', [0, 1]],
        ],
        face: [1, 3, 0, 2],
      },
    },
    Down: {
      Clockwise: {
        ring: [
          ['Front', [2, 3]],
          ['Right', [2, 3]],
          ['Back', [2, 3]],
          ['Left', [2, 3]],
        ],
        face: [2, 0, 3, 1],
      },
      CounterClockwise: {
        ring: [
          ['Front', [3, 2]],
          ['Left', [3, 2]],
          ['Back', [3, 2]],
          ['Right', [3, 2]],
        ],
        face: [1, 3, 0, 2],
      },
    },
  };

  public rotateRubikCubeGroupLogical(
    rotationGroup: THexahedron2x2RotationGroups,
    rotationType: THexahedronRotationTypes,
    logicalValues: TFaceLogicalValues<THexahedronFaces>,
  ): TFaceLogicalValues<THexahedronFaces> {
    const { ring, face } = this.data[rotationGroup][rotationType];

    const acc1: Array<number> = [
      ...ring[0][1]
        .map((idx) => logicalValues[ring[0][0]][idx])
        .filter((value) => typeof value === 'number'),
    ];
    const acc2: Array<number> = [];

    for (let i = 0; i < ring.length; i++) {
      acc2.splice(0, acc2.length, ...acc1);

      const nextMove = ring[(i + 1) % ring.length];
      const nextMoveValues = nextMove[1]
        .map((idx) => logicalValues[nextMove[0]][idx])
        .filter((value) => typeof value === 'number');

      acc1.splice(0, acc1.length, ...nextMoveValues);

      for (let j = 0; j < acc2.length; j++) {
        logicalValues[nextMove[0]][nextMove[1][j]] = acc2[j];
      }
    }

    const faceValuesCopy = [...logicalValues[rotationGroup]];
    for (const idx of face) {
      logicalValues[rotationGroup][idx] = faceValuesCopy[idx];
    }

    return logicalValues;
  }
}
