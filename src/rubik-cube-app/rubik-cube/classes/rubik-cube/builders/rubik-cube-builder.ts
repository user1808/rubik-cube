import * as THREE from 'three';
import type {
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeShellData,
} from '../../../interfaces/data';
import type { IRubikCubeBuilder, IRubikCubePieceBuilder } from '../../../interfaces/builders';
import type { IRubikCubePieceWrapper, IRubikCube } from '../../../interfaces/structure';
import type { IRubikCubeRotationImplementation } from '../../../interfaces/rubik-cube-rotation-implementation';
import type { IRubikCubeGLTFLoader } from '../../../interfaces/rubik-cube-gltf-loader';
import { RubikCube } from '../structure/cube/rubik-cube';
import { RubikCubePieceWrapper } from '../structure/piece/rubik-cube-piece-wrapper';
import type { IRubikCubeShellBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-shell-builder';
import type { IRubikCubePiecesBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-pieces-builder';
import type { IRubikCubeRotationGroupBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-rotation-group-builder';
import type { IRubikCubeRotationGroupsBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/builders/rubik-cube-rotation-groups-builder';

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
  constructor(
    private readonly cubePieceBuilder: IRubikCubePieceBuilder<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeEdgeFaces
    >,
    private readonly cubePiecesBuilder: IRubikCubePiecesBuilder,
    private readonly cubeRotationGroupBuilder: IRubikCubeRotationGroupBuilder,
    private readonly cubeRotationGroupsBuilder: IRubikCubeRotationGroupsBuilder<TCubeRotationGroups>,
    private readonly cubeShellBuilder: IRubikCubeShellBuilder<
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >,
  ) {}

  public async buildCube(
    scene: THREE.Scene,
    gltfLoader: IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>,
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
    const loadedGLTFCubeShell = await gltfLoader.loadGLTFCubeShell(cubeShellData.filename);
    const cubeShell = this.cubeShellBuilder.buildShell(loadedGLTFCubeShell, cubeShellData);

    const cubePieces = await this.buildCubePieces(
      gltfLoader,
      this.cubePieceBuilder,
      materials,
      piecesData,
    );
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
}
