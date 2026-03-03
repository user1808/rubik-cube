import type { IRubikCubeLogicalRotationImplementation } from '@/rubik-cube-app/rubik-cube/interfaces';
import type {
  TTetrahedronRotationGroups,
  TTetrahedronRotationTypes,
} from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron';
import type { TTetrahedronFaces } from '@/rubik-cube-app/rubik-cube/types/specific-rubik-cube/tetrahedron/cube-faces';
import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';

export class TetrahedronLogicalRotationImplementation
  implements
    IRubikCubeLogicalRotationImplementation<
      TTetrahedronFaces,
      TTetrahedronRotationGroups,
      TTetrahedronRotationTypes
    >
{
  public rotateRubikCubeGroupLogical(
    rotationGroup: TTetrahedronRotationGroups,
    rotationType: TTetrahedronRotationTypes,
    logicalValues: TFaceLogicalValues<TTetrahedronFaces>,
  ): TFaceLogicalValues<TTetrahedronFaces> {
    return logicalValues;
  }
}
