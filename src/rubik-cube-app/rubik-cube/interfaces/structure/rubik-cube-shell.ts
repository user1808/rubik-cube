import * as THREE from 'three';
import type { IRubikCubeShellPiece } from './rubik-cube-shell-piece';

export interface IRubikCubeShell<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> extends THREE.Group {
  readonly pieces: {
    [TCubeShellPiece in TCubeShellPieces]: IRubikCubeShellPiece<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPiece
    >;
  };
}
