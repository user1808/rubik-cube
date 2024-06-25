import * as THREE from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { TShellPieceData, TShellPieces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { IRubikCubeShellPiecesBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import { RubikCubeShellPiece } from '../structure/shell/rubik-cube-shell-piece';
import { TypeGuards } from '@/utils/type-guards';

export class RubikCubeShellPiecesBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellPieces extends string,
> implements
    IRubikCubeShellPiecesBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  constructor(
    private readonly loadedGLTFCubeShell: GLTF,
    private readonly shellPiecesData: Record<
      TCubeShellPieces,
      TShellPieceData<TCubeRotationGroups, TCubeRotationTypes>
    >,
    private readonly shellMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    }),
  ) {}

  public buildShellPieces(): TShellPieces<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    return this.loadedGLTFCubeShell.scene.children.reduce(
      (shellPieces, currentPiece) => {
        if (!TypeGuards.isT(currentPiece, THREE.Mesh)) return shellPieces;

        const name = currentPiece.name;
        if (!TypeGuards.isObjectKey(name, this.shellPiecesData)) return shellPieces;

        return {
          ...shellPieces,
          [name]: new RubikCubeShellPiece(
            name,
            this.shellPiecesData[name],
            currentPiece.geometry,
            this.shellMaterial,
          ),
        };
      },
      {} as TShellPieces<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>,
    );
  }
}
