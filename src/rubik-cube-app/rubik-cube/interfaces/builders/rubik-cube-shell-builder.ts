import type { IRubikCubeShell } from '../structure';

export interface IRubikCubeShellBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> {
  buildShell(): Promise<IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>>;
}
