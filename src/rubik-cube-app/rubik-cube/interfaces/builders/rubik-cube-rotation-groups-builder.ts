import type { IRubikCube, IRubikCubePieceWrapper } from '../structure';

export interface IRubikCubeRotationGroupsBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> {
  buildRotationGroups(
    cubePieces: Array<IRubikCubePieceWrapper>,
  ): IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>['rotationGroups'];
}
