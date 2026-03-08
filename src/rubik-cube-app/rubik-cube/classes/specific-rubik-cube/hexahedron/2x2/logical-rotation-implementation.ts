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
    Record<THexahedronRotationTypes, Array<[THexahedron2x2RotationGroups, Array<number>]>>
  > = {
    Front: {
      Clockwise: [
        ['Up', [2, 3]],
        ['Right', [0, 2]],
        ['Down', [1, 0]],
        ['Left', [3, 1]],
      ],
      CounterClockwise: [
        ['Up', [3, 2]],
        ['Left', [1, 3]],
        ['Down', [0, 1]],
        ['Right', [2, 0]],
      ],
    },
    Back: {
      Clockwise: [
        ['Up', [1, 0]],
        ['Left', [0, 2]],
        ['Down', [2, 3]],
        ['Right', [3, 1]],
      ],
      CounterClockwise: [
        ['Up', [0, 1]],
        ['Right', [1, 3]],
        ['Down', [3, 2]],
        ['Left', [2, 0]],
      ],
    },
    Right: {
      Clockwise: [
        ['Up', [3, 1]],
        ['Back', [0, 2]],
        ['Down', [3, 1]],
        ['Front', [3, 1]],
      ],
      CounterClockwise: [
        ['Up', [1, 3]],
        ['Front', [1, 3]],
        ['Down', [1, 3]],
        ['Back', [2, 0]],
      ],
    },
    Left: {
      Clockwise: [
        ['Up', [0, 2]],
        ['Front', [0, 2]],
        ['Down', [0, 2]],
        ['Back', [3, 1]],
      ],
      CounterClockwise: [
        ['Up', [2, 0]],
        ['Back', [1, 3]],
        ['Down', [2, 0]],
        ['Front', [2, 0]],
      ],
    },
    Up: {
      Clockwise: [
        ['Back', [1, 0]],
        ['Right', [1, 0]],
        ['Front', [1, 0]],
        ['Left', [1, 0]],
      ],
      CounterClockwise: [
        ['Back', [0, 1]],
        ['Left', [0, 1]],
        ['Front', [0, 1]],
        ['Right', [0, 1]],
      ],
    },
    Down: {
      Clockwise: [
        ['Front', [2, 3]],
        ['Right', [2, 3]],
        ['Back', [2, 3]],
        ['Left', [2, 3]],
      ],
      CounterClockwise: [
        ['Front', [3, 2]],
        ['Left', [3, 2]],
        ['Back', [3, 2]],
        ['Right', [3, 2]],
      ],
    },
  };

  public rotateRubikCubeGroupLogical(
    rotationGroup: THexahedron2x2RotationGroups,
    rotationType: THexahedronRotationTypes,
    logicalValues: TFaceLogicalValues<THexahedronFaces>,
  ): TFaceLogicalValues<THexahedronFaces> {
    const moves = this.data[rotationGroup][rotationType];
    return logicalValues;
  }
}
