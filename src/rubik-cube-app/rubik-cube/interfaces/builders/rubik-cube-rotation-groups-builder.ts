import type { TCubePieces, TRotationGroups } from '../../types/rubik-cube';

export interface IRubikCubeRotationGroupsBuilder<
  TCubeFacesNames extends string,
  TCubeRotationGroups extends string,
> {
  buildRotationGroups(
    cubePieces: TCubePieces<TCubeFacesNames>,
  ): TRotationGroups<TCubeFacesNames, TCubeRotationGroups>;
}
