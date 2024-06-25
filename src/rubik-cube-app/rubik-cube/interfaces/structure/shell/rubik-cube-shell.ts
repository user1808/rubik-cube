import * as THREE from 'three';
import type { TShellPieces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export interface IRubikCubeShell<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> extends THREE.Group {
  readonly pieces: TShellPieces<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
}
