import type { IRubikCubeShellPiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export type TShellPieces<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
> = Array<IRubikCubeShellPiece<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>>;
