import type { IRubikCubeLogicalRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces';
import type { THexahedron3x3RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/3x3/rotation-groups';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';

export class Hexahedron3x3LogicalRotationImplementation
  implements
    IRubikCubeLogicalRotationImplementation<
      THexahedronFaces,
      THexahedron3x3RotationGroups,
      THexahedronRotationTypes
    >
{
  public rotateRubikCubeGroupLogical(
    rotationGroup: THexahedron3x3RotationGroups,
    rotationType: THexahedronRotationTypes,
    logicalValues: TFaceLogicalValues<THexahedronFaces>,
  ): TFaceLogicalValues<THexahedronFaces> {
    return logicalValues;
  }
}
