import type { IRubikCubeGLTFLoader } from './rubik-cube-gltf-loader';
import type { IRubikCubeRotationImplementation } from './rubik-cube-rotation-implementation';
import type { IRubikCubeShellData } from './data/rubik-cube-shell-data';
import type { IRubikCubeMaterials, IRubikCubePiecesData, IRubikCubeRotationData } from './data';
import type { IRubikCubeBuilder, IRubikCubePieceBuilder, IRubikCubeShellBuilder } from './builders';
import type { IRubikCube, IRubikCubePieceWrapper } from './structure';
import type { IRubikCubeShellPiecesBuilder } from './builders/rubik-cube-shell-pieces-builder';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubePiecesBuilder } from './builders/rubik-cube-pieces-builder';
import type { IRubikCubeRotationGroupsBuilder } from './builders/rubik-cube-rotation-groups-builder';

export type TUniversalRubikCubeFactory = IRubikCubeFactory<
  Record<string, string>,
  string,
  string,
  string,
  string,
  string,
  string
>;

export interface IRubikCubeFactory<
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
> {
  get commonName(): string;

  createRubikCubePiecesData(): IRubikCubePiecesData<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeRotationGroups
  >;
  createRubikCubeRotationData(): IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>;
  createRubikCubeShellData(): IRubikCubeShellData<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilename,
    TCubeShellPieces
  >;

  createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>;

  createRubikCubeGLTFLoader(): IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>;

  createRubikCubeShellPiecesBuilder(
    loadedGLTFCubeShell: GLTF,
  ): IRubikCubeShellPiecesBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
  createRubikCubeShellBuilder(
    loadedGLTFCubeShell: GLTF,
  ): IRubikCubeShellBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
  createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  >;
  createRubikCubePiecesBuilder(
    loadedGLTFPieces: Map<TCubePiecesFilenames, GLTF>,
  ): IRubikCubePiecesBuilder;
  createRubikCubeRotationGroupsBuilder(
    cubePieces: Array<IRubikCubePieceWrapper>,
  ): IRubikCubeRotationGroupsBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>;
  createRubikCubeBuilder(
    loadedGLTFCubeShell: GLTF,
    loadedGLTFPieces: Map<TCubePiecesFilenames, GLTF>,
  ): IRubikCubeBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >;

  createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >;

  createRubikCube(): Promise<IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>>;
}
