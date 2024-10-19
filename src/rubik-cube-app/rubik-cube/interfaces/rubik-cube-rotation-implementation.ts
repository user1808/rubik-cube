import type { IRubikCube } from './structure';

export interface IRubikCubeRotationImplementation<
  TCubeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> {
  rotateRubikCubeGroup(
    rubikCube: IRubikCube<
      TCubeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
  ): Promise<void>;
}
