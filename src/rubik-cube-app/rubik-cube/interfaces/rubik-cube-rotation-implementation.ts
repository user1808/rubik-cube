import type { IRubikCube } from './structure';

export interface IRubikCubeRotationImplementation<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> {
  rotateRubikCubeGroup(
    rubikCube: IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>,
    rotationGroup: TCubeRotationGroups,
    rotationType: TCubeRotationTypes,
  ): Promise<void>;
}
