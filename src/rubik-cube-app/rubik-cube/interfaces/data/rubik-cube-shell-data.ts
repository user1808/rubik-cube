import type { TShellPieceData } from '../../types/rubik-cube';

export interface IRubikCubeShellData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
  TCubeShellPieces extends string,
> {
  readonly filename: TCubeShellFilename;
  readonly piecesData: Record<
    TCubeShellPieces,
    TShellPieceData<TCubeRotationGroups, TCubeRotationTypes>
  >;
}
