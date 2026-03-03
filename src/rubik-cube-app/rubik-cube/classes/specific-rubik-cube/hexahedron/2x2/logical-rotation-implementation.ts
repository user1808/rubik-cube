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
  public rotateRubikCubeGroupLogical(
    rotationGroup: THexahedron2x2RotationGroups,
    rotationType: THexahedronRotationTypes,
    logicalValues: TFaceLogicalValues<THexahedronFaces>,
  ): TFaceLogicalValues<THexahedronFaces> {
    return logicalValues;
  }
}
