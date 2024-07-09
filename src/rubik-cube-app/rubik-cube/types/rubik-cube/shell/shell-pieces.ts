import type { IRubikCubeShellPiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export type TShellPieces<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> = {
  [TCubeShellPiece in TCubeShellPieces]: IRubikCubeShellPiece<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPiece
  >;
};
