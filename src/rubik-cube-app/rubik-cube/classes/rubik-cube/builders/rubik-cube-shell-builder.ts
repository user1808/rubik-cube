import * as THREE from 'three';
import type { IRubikCubeShellBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type { IRubikCubeShellData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type {
  IRubikCubeShell,
  IRubikCubeShellPiece,
} from '@/rubik-cube-app/rubik-cube/interfaces/structure';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RubikCubeShellPiece } from '../structure/shell/rubik-cube-shell-piece';
import { RubikCubeShell } from '../structure/shell/rubik-cube-shell';

export class RubikCubeShellBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
  TCubeShellPieces extends string,
> implements
    IRubikCubeShellBuilder<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >
{
  constructor(
    private readonly cubeShellMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    }),
  ) {}

  public buildShell(
    loadedGLTFCubeShell: GLTF,
    cubeShellData: IRubikCubeShellData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >,
  ): IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces> {
    const shellPieces: {
      [TCubeShellPiece in TCubeShellPieces]: IRubikCubeShellPiece<
        TCubeRotationGroups,
        TCubeRotationTypes,
        TCubeShellPiece
      >;
    } = loadedGLTFCubeShell.scene.children.reduce(
      (acc, cur) => {
        const piece = cur as THREE.Mesh;
        const name = cur.name as TCubeShellPieces;
        const data = cubeShellData.piecesData[name];

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
