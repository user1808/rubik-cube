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
    private readonly _pieces: {
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
      >(_pieces),
    );
  }

  public get pieces(): {
    [TCubeShellPiece in TCubeShellPieces]: IRubikCubeShellPiece<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPiece
    >;
  } {
    return this._pieces;
  }
}
