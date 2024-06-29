import type { IRubikCube } from '../structure';

export interface IRubikCubeRotationGroupsBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> {
  buildRotationGroups(): IRubikCube<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >['rotationGroups'];
}
