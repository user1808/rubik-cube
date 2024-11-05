import type { TShellPieces } from '../../types/rubik-cube';

export interface IRubikCubeShellPiecesBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
> {
  buildShellPieces(): Promise<
    TShellPieces<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
  >;
}
