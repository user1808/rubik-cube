import type { IRubikCubeLogicalRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces';
import type { THexahedron5x5RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/5x5/rotation-groups';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';

export class Hexahedron5x5LogicalRotationImplementation
  implements
    IRubikCubeLogicalRotationImplementation<
      THexahedronFaces,
      THexahedron5x5RotationGroups,
      THexahedronRotationTypes
    >
{
  public rotateRubikCubeGroupLogical(
    rotationGroup: THexahedron5x5RotationGroups,
    rotationType: THexahedronRotationTypes,
    logicalValues: TFaceLogicalValues<THexahedronFaces>,
  ): TFaceLogicalValues<THexahedronFaces> {
    return logicalValues;
  }
}
