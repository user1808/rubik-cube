import * as THREE from 'three';
import type {
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeShellData,
} from '../../interfaces/data';
import type { IRubikCubeBuilder, IRubikCubePieceBuilder } from '../../interfaces/builders';
import type {
  IRubikCubePieceWrapper,
  IRubikCube,
  IRubikCubeShell,
  IRubikCubeShellPiece,
} from '../../interfaces/structure';
import type { IRubikCubeRotationImplementation } from '../../interfaces/rubik-cube-rotation-implementation';
import type { IRubikCubeGLTFLoader } from '../../interfaces/rubik-cube-gltf-loader';
import { RubikCube } from './structure/cube/rubik-cube';
import { RubikCubePieceWrapper } from './structure/piece/rubik-cube-piece-wrapper';
import { RubikCubeShell } from './structure/shell/rubik-cube-shell';
import { RubikCubeShellPiece } from './structure/shell/rubik-cube-shell-piece';

export class RubikCubeBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
  TCubeShellPieces extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements
    IRubikCubeBuilder<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeEdgeFaces,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces,
      TCubePiecesFilenames
    >
{
  public async buildCube(
    scene: THREE.Scene,
    gltfLoader: IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>,
    pieceBuilder: IRubikCubePieceBuilder<TCubePiecesFilenamesWithFaces, TCubeFaces, TCubeEdgeFaces>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
    cubeShellData: IRubikCubeShellData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >,
    piecesData: IRubikCubePiecesData<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeRotationGroups,
      TCubePiecesFilenames
    >,
    rotationData: IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>,
    rotationImplementation: IRubikCubeRotationImplementation<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellPieces
    >,
  ): Promise<IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>> {
    const cubeShell = await this.buildCubeShell(gltfLoader, cubeShellData);
    const cubePieces = await this.buildCubePieces(gltfLoader, pieceBuilder, materials, piecesData);
    const cubeRotationGroups = this.buildCubeRotationGroups(cubePieces, piecesData);

    return new RubikCube(
      scene,
      cubeShell,
      cubePieces,
      cubeRotationGroups,
      rotationData,
      rotationImplementation,
    );
  }

  private async buildCubeShell(
    gltfLoader: IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>,
    cubeShellData: IRubikCubeShellData<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >,
  ): Promise<IRubikCubeShell<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>> {
    const loadedGLTFCubeShell = await gltfLoader.loadGLTFCubeShell(cubeShellData.filename);

    const transparentMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });

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
            transparentMaterial,
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

  private async buildCubePieces(
    gltfLoader: IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>,
    pieceBuilder: IRubikCubePieceBuilder<TCubePiecesFilenamesWithFaces, TCubeFaces, TCubeEdgeFaces>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
    piecesData: IRubikCubePiecesData<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeRotationGroups,
      TCubePiecesFilenames
    >,
  ): Promise<Array<IRubikCubePieceWrapper>> {
    const loadedGLTFPieces = await gltfLoader.loadGLTFCubePieces(piecesData.piecesFilenames);

    return piecesData.piecesData.map(
      (pieceData) =>
        new RubikCubePieceWrapper(pieceBuilder.createPiece(loadedGLTFPieces, pieceData, materials)),
    );
  }

  private buildCubeRotationGroups(
    cubePieces: Array<IRubikCubePieceWrapper>,
    cubePiecesData: IRubikCubePiecesData<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeRotationGroups
    >,
  ): Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>> {
    const { rotationGroupsPiecesIdxs } = cubePiecesData;

    const rotationGroups = (<Array<TCubeRotationGroups>>(
      Object.keys(rotationGroupsPiecesIdxs)
    )).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: rotationGroupsPiecesIdxs[cur].map((idx) => cubePieces[idx]),
      }),
      {} as Record<TCubeRotationGroups, Array<IRubikCubePieceWrapper>>,
    );

    return rotationGroups;
  }
}
