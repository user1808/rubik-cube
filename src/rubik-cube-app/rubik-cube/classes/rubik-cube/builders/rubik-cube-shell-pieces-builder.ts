import type { MeshBasicMaterial } from 'three';
import { Vector3, Mesh } from 'three';
import type { TShellPieces } from '@/rubik-cube-app/rubik-cube/types/rubik-cube';
import type { IRubikCubeShellPiecesBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders';
import type { IRubikCubeShellData } from '@/rubik-cube-app/rubik-cube/interfaces/data';
import type { IRubikCubeGLTFLoader } from '@/rubik-cube-app/rubik-cube/interfaces';
import { RubikCubeShellPiece } from '../structure/shell/rubik-cube-shell-piece';
import { TypeGuards } from '@/utils/type-guards';

export class RubikCubeShellPiecesBuilder<
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
  TCubeFacesTextsFilename extends string,
  TCubePiecesFilenames extends string,
> implements
    IRubikCubeShellPiecesBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
{
  constructor(
    private readonly gltfLoader: IRubikCubeGLTFLoader<
      TCubeShellFilenames,
      TCubePiecesFilenames,
      TCubeFacesTextsFilename
    >,
    private readonly material: MeshBasicMaterial,
    private readonly shellData: IRubikCubeShellData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >,
  ) {}

  public async buildShellPieces(): Promise<
    TShellPieces<TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
  > {
    const loadedGLTFCubeShell = await this.gltfLoader.loadGLTFCubeShellPieces(
      this.shellData.piecesFilenames,
    );
    return this.shellData.piecesData.map((currentPieceData) => {
      const gltfPiece = loadedGLTFCubeShell.get(currentPieceData.filename)?.scene.children[0];
      if (!gltfPiece) throw new Error(`${currentPieceData.filename} shell piece was not found`);

      if (!TypeGuards.isT(gltfPiece, Mesh))
        throw new Error(`${currentPieceData.filename} shell piece is not a mesh`);

      const newPiece = new RubikCubeShellPiece(
        currentPieceData.rotations,
        gltfPiece.geometry,
        this.material,
      );

      const { x, y, z } = currentPieceData.initPosition;
      newPiece.position.set(x, y, z);
      const { rotation, axes } = currentPieceData.initRotation;
      if (this.shellData.isRotateOnWorldAxis) {
        newPiece.rotateOnWorldAxis(axes?.x || new Vector3(1, 0, 0), rotation.x);
        newPiece.rotateOnWorldAxis(axes?.y || new Vector3(0, 1, 0), rotation.y);
        newPiece.rotateOnWorldAxis(axes?.z || new Vector3(0, 0, -1), rotation.z);
        return newPiece;
      }
      newPiece.rotateOnAxis(axes?.x || new Vector3(1, 0, 0), rotation.x);
      newPiece.rotateOnAxis(axes?.y || new Vector3(0, 1, 0), rotation.y);
      newPiece.rotateOnAxis(axes?.z || new Vector3(0, 0, -1), rotation.z);
      return newPiece;
    });
  }
}
