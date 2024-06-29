import type { IRubikCubeShell } from '../structure';

export interface IRubikCubeShellPiecesBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> {
  buildShellPieces(): IRubikCubeShell<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >['pieces'];
}
