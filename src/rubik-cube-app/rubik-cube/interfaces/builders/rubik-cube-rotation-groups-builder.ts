import type { TCubePieces, TRotationGroups } from '../../types/rubik-cube';

export interface IRubikCubeRotationGroupsBuilder<TCubeRotationGroups extends string> {
  buildRotationGroups(cubePieces: TCubePieces): TRotationGroups<TCubeRotationGroups>;
}
