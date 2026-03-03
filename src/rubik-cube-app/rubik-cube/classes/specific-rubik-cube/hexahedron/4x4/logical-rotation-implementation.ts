import type { IRubikCubeLogicalRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces';
import type { THexahedron4x4RotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/4x4/rotation-groups';
import type { THexahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/cube-faces';
import type { THexahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/hexahedron/rotation-types';
import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';

export class Hexahedron4x4LogicalRotationImplementation
  implements
    IRubikCubeLogicalRotationImplementation<
      THexahedronFaces,
      THexahedron4x4RotationGroups,
      THexahedronRotationTypes
    >
{
  public rotateRubikCubeGroupLogical(
    rotationGroup: THexahedron4x4RotationGroups,
    rotationType: THexahedronRotationTypes,
    logicalValues: TFaceLogicalValues<THexahedronFaces>,
  ): TFaceLogicalValues<THexahedronFaces> {
    return logicalValues;
  }
}
