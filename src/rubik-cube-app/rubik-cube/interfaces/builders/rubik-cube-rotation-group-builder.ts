import type { IRubikCubePieceWrapper } from '../structure';

export interface IRubikCubeRotationGroupBuilder {
  buildRotationGroup(
    cubePieces: Array<IRubikCubePieceWrapper>,
    rotationGroupPiecesIdxs: Array<number>,
  ): Array<IRubikCubePieceWrapper>;
}
