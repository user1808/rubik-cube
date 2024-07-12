import type { TPieceIdx } from '../../types/rubik-cube';

export interface IRubikCubeRotationGroupsData<TCubeRotationGroups extends string> {
  readonly rotationGroupsPiecesIdxs: Record<TCubeRotationGroups, Array<TPieceIdx>>;
}
