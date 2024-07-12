import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { MouseTouchTracker } from '@/rubik-cube-app/common';
import type { IRubikCube } from './structure';
import type {
  IRubikCubeGLTFLoader,
  IRubikCubeRotationImplementation,
  IRubikCubeRotationRaycaster,
} from '@/rubik-cube-app/rubik-cube/interfaces';
import type {
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
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

  createRubikCubePiecesData(): IRubikCubePiecesData<TCubePiecesFilenamesWithFaces, TCubeFaces>;
  createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<TCubeRotationGroups>;
  createRubikCubeRotationData(): IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>;
  createRubikCubeShellData(): IRubikCubeShellData<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilename,
    TCubeShellPieces
  >;

  createRubikCubeShellMaterial(): THREE.MeshBasicMaterial;
  createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>;

  createRubikCubeGLTFLoader(): IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>;

  createRubikCubeShellPiecesBuilder(): IRubikCubeShellPiecesBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >;
  createRubikCubeShellBuilder(): IRubikCubeShellBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >;

  createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  >;
  createRubikCubePiecesBuilder(): IRubikCubePiecesBuilder;

  createRubikCubeRotationGroupsBuilder(): IRubikCubeRotationGroupsBuilder<TCubeRotationGroups>;

  createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >;

  createRubikCubeRotationRaycaster(
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: OrbitControls,
  ): IRubikCubeRotationRaycaster;

  createRubikCubeBuilder(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
  ): IRubikCubeBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  >;

  createRubikCube(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: OrbitControls,
  ): Promise<IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>>;
}
