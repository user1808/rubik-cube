import type { IRubikCubeLogicalRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces';
import type { TDodecahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/cube-faces';
import type { TDodecahedronRotationGroups } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-groups';
import type { TDodecahedronRotationTypes } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/dodecahedron/rotation-types';
import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';

export class DodecahedronLogicalRotationImplementation
  implements
    IRubikCubeLogicalRotationImplementation<
      TDodecahedronFaces,
      TDodecahedronRotationGroups,
      TDodecahedronRotationTypes
    >
{
  public rotateRubikCubeGroupLogical(
    rotationGroup: TDodecahedronRotationGroups,
    rotationType: TDodecahedronRotationTypes,
    logicalValues: TFaceLogicalValues<TDodecahedronFaces>,
  ): TFaceLogicalValues<TDodecahedronFaces> {
    return logicalValues;
  }
}
