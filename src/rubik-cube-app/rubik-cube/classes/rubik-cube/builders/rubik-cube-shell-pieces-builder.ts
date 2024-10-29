import * as THREE from 'three';
import type { TShellPieces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { IRubikCubeShellPiecesBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type { IRubikCubeShellData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { IRubikCubeGLTFLoader } from '@/rubik-cube-app/rubik-cube/interfaces';
import { RubikCubeShellPiece } from '../structure/shell/rubik-cube-shell-piece';
import { TypeGuards } from '@/utils/type-guards';

export class RubikCubeShellPiecesBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
  TCubeShellPieces extends string,
  TCubePiecesFilenames extends string,
> implements
    IRubikCubeShellPiecesBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
{
  constructor(
    private readonly gltfLoader: IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>,
    private readonly material: THREE.MeshBasicMaterial,
    private readonly shellData: IRubikCubeShellData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >,
  ) {}

  public async buildShellPieces(): Promise<
    TShellPieces<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
  > {
    const loadedGLTFCubeShell = await this.gltfLoader.loadGLTFCubeShell(this.shellData.filename);
    return loadedGLTFCubeShell.scene.children.reduce(
      (shellPieces, currentPiece) => {
        if (!TypeGuards.isT(currentPiece, THREE.Mesh)) return shellPieces;

        const name = currentPiece.name;
        if (!TypeGuards.isObjectKey(name, this.shellData.piecesData)) return shellPieces;

        return {
          ...shellPieces,
          [name]: new RubikCubeShellPiece(
            name,
            this.shellData.piecesData[name],
            currentPiece.geometry,
            this.material,
          ),
        };
      },
      {} as TShellPieces<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>,
    );
  }
}
