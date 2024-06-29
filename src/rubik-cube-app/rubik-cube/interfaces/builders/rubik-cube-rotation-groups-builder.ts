import type { IRubikCubePieceWrapper } from '../structure';

export interface IRubikCubeRotationGroupsBuilder<TCubeRotationGroups extends string> {
  buildRotationGroups(
    cubePieces: Array<IRubikCubePieceWrapper>,
    rotationGroupsPiecesIdxs: Record<TCubeRotationGroups, Array<number>>,
  ): Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>>;
}
