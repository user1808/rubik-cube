import * as THREE from 'three';
import type {
  IRubikCubeShell,
  IRubikCubeShellPiece,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';

export class RubikCubeShell<
    TCubeRotationGroups extends string,
    TCubeRotationTypes extends string,
    TCubeShellPieces extends string,
  >
  extends THREE.Group
  implements IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  constructor(
    public readonly pieces: {
      [TCubeShellPiece in TCubeShellPieces]: IRubikCubeShellPiece<
        TCubeRotationGroups,
        TCubeRotationTypes,
        TCubeShellPiece
      >;
    },
  ) {
    super();
    this.add(
      ...Object.values<
        IRubikCubeShellPiece<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
      >(pieces),
    );
  }
}
