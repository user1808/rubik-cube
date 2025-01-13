import type { TShellPieceData } from '../../types/rubik-cube';

export interface IRubikCubeShellData<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
> {
  readonly piecesFilenames: Array<TCubeShellFilenames>;
  readonly piecesData: Array<
    TShellPieceData<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
  >;
  readonly isRotateOnWorldAxis: boolean;
}
