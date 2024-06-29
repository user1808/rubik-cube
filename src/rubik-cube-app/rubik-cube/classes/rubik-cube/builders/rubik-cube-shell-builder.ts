import * as THREE from 'three';
import type { IRubikCubeShellBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type {
  IRubikCubeShell,
  IRubikCubeShellPiece,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RubikCubeShellPiece } from '../structure/shell/rubik-cube-shell-piece';
import { RubikCubeShell } from '../structure/shell/rubik-cube-shell';
import type { TShellPieceData } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';

export class RubikCubeShellBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> implements IRubikCubeShellBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  constructor(
    private readonly loadedGLTFCubeShell: GLTF,
    private readonly shellPiecesData: Record<
      TCubeShellPieces,
      TShellPieceData<TCubeRotationGroups, TCubeRotationTypes>
    >,
    private readonly cubeShellMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    }),
  ) {}

  public buildShell(): IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces> {
    const shellPieces: {
      [TCubeShellPiece in TCubeShellPieces]: IRubikCubeShellPiece<
        TCubeRotationGroups,
        TCubeRotationTypes,
        TCubeShellPiece
      >;
    } = this.loadedGLTFCubeShell.scene.children.reduce(
      (acc, cur) => {
        const piece = cur as THREE.Mesh;
        const name = cur.name as TCubeShellPieces;
        const data = this.shellPiecesData[name];

        return {
          ...acc,
          [name]: new RubikCubeShellPiece(
            name,
            data,
            piece.geometry as THREE.BufferGeometry,
            this.cubeShellMaterial,
          ),
        };
      },
      {} as {
        [TCubeShellPiece in TCubeShellPieces]: IRubikCubeShellPiece<
          TCubeRotationGroups,
          TCubeRotationTypes,
          TCubeShellPiece
        >;
      },
    );

    return new RubikCubeShell(shellPieces);
  }
}
