import * as THREE from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubeGLTFLoader } from './rubik-cube-gltf-loader';
import type { IRubikCube, IRubikCubePieceWrapper } from './structure';
import type { IRubikCubeRotationImplementation } from './rubik-cube-rotation-implementation';
import type {
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeShellData,
} from './data';
import type {
  IRubikCubeBuilder,
  IRubikCubePieceBuilder,
  IRubikCubePiecesBuilder,
  IRubikCubeRotationGroupsBuilder,
  IRubikCubeShellBuilder,
  IRubikCubeShellPiecesBuilder,
} from './builders';

export interface IRubikCubeFactory<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFaces extends string = string,
  TCubeEdgeFaces extends string = string,
  TCubeRotationGroups extends string = string,
  TCubeRotationTypes extends string = string,
  TCubeShellFilename extends string = string,
  TCubeShellPieces extends string = string,
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
  ): IRubikCubeRotationGroupsBuilder<TCubeRotationGroups>;
  createRubikCubeBuilder(
    scene: THREE.Scene,
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

  createRubikCube(
    scene: THREE.Scene,
  ): Promise<IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>>;
}
