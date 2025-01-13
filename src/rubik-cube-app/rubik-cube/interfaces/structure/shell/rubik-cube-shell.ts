import { Group } from 'three';
import type { TShellPieces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export interface IRubikCubeShell<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
> extends Group {
  readonly pieces: TShellPieces<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>;
}
