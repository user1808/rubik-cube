import type { TFaceLogicalValues } from '@/stores/use-faces-logical-values-store';

export interface IRubikCubeLogicalRotationImplementation<
  TCubeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
> {
  rotateRubikCubeGroupLogical(
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
    logicalValues: TFaceLogicalValues<TCubeFacesNames>,
  ): TFaceLogicalValues<TCubeFacesNames>;
}
