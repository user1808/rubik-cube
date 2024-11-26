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
  IRubikCubeFacesData,
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
  IRubikCubeShellData,
} from './data';
import type {
  IRubikCubeBuilder,
  IRubikCubeFacesBuilder,
  IRubikCubePieceBuilder,
  IRubikCubePiecesBuilder,
  IRubikCubeRotationGroupsBuilder,
  IRubikCubeShellBuilder,
  IRubikCubeShellPiecesBuilder,
} from './builders';

export interface IRubikCubeFactory<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string = string,
  TCubeEdgeFacesNames extends string = string,
  TCubeRotationGroups extends string = string,
  TCubeRotationTypes extends string = string,
  TCubeShellFilenames extends string = string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> {
  get commonName(): string;

  createRubikCubePiecesData(): IRubikCubePiecesData<TCubePiecesFilenamesWithFaces, TCubeFacesNames>;
  createRubikCubeFacesData(): IRubikCubeFacesData<TCubeFacesNames>;
  createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<TCubeRotationGroups>;
  createRubikCubeRotationData(): IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>;
  createRubikCubeShellData(): IRubikCubeShellData<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  >;

  createRubikCubeShellMaterial(): THREE.MeshBasicMaterial;
  createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>;

  createRubikCubeGLTFLoader(): IRubikCubeGLTFLoader<TCubeShellFilenames, TCubePiecesFilenames>;

  createRubikCubeShellPiecesBuilder(): IRubikCubeShellPiecesBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  >;
  createRubikCubeShellBuilder(): IRubikCubeShellBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  >;

  createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFacesNames,
    TCubeEdgeFacesNames
  >;
  createRubikCubePiecesBuilder(): IRubikCubePiecesBuilder<TCubeFacesNames>;

  createRubikCubeFacesBuilder(): IRubikCubeFacesBuilder<TCubeFacesNames>;

  createRubikCubeRotationGroupsBuilder(): IRubikCubeRotationGroupsBuilder<
    TCubeFacesNames,
    TCubeRotationGroups
  >;

  createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeFacesNames,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
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
    TCubeFacesNames,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  >;

  createRubikCube(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: OrbitControls,
  ): Promise<
    IRubikCube<TCubeFacesNames, TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
  >;
}
