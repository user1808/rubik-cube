import type { IRubikCubeShell } from '../structure';

export interface IRubikCubeShellBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
> {
  buildShell(): Promise<
    IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
  >;
}
