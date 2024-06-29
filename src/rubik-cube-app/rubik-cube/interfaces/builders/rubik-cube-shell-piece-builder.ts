import type { IRubikCubeShellPiece } from '../structure';

export interface IRubikCubeShellPieceBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPiece extends string,
> {
  buildShellPiece(): IRubikCubeShellPiece<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPiece>;
}
