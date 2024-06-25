import * as THREE from 'three';
import type { IRubikCubeGLTFLoader } from './rubik-cube-gltf-loader';
import type { IRubikCubeRotationImplementation } from './rubik-cube-rotation-implementation';
import type { IRubikCubeShellData } from './data/rubik-cube-shell-data';
import type { IRubikCubeMaterials, IRubikCubePiecesData, IRubikCubeRotationData } from './data';
import type { IRubikCubeBuilder, IRubikCubePieceBuilder } from './builders';
import type { IRubikCube } from './structure';

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
  createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  >;
  createRubikCubeBuilder(): IRubikCubeBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilename,
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
