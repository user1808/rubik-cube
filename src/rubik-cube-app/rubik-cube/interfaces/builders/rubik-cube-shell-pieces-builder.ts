import type { TShellPieces } from '../../types/rubik-cube';

export interface IRubikCubeShellPiecesBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> {
  buildShellPieces(): TShellPieces<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
}
