import type { Scene, PerspectiveCamera, MeshBasicMaterial } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { MouseTouchTracker } from '@/rubik-cube-app/common';
import type { IRubikCube } from './structure';
import type { TCubeCommonNames } from '../types/cube-common-name';
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
import type { IRubikCubeFacesTextsBuilder } from './builders/rubik-cube-faces-texts-builder';

export type DefaultRubikCubeFactory<TCubeCommonName extends TCubeCommonNames = TCubeCommonNames> =
  IRubikCubeFactory<Record<string, string>, TCubeCommonName>;

export interface IRubikCubeFactory<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeCommonName extends TCubeCommonNames = TCubeCommonNames,
  TCubeFacesNames extends string = string,
  TCubeEdgeFacesNames extends string = string,
  TCubeRotationGroups extends string = string,
  TCubeRotationTypes extends string = string,
  TCubeShellFilenames extends string = string,
  TCubeFacesTextsFilename extends string = string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> {
  get commonName(): TCubeCommonName;
  get facesTextsFilename(): TCubeFacesTextsFilename;

  createRubikCubePiecesData(): IRubikCubePiecesData<TCubePiecesFilenamesWithFaces, TCubeFacesNames>;
  createRubikCubeFacesData(): IRubikCubeFacesData<TCubeFacesNames>;
  createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<TCubeRotationGroups>;
  createRubikCubeRotationData(): IRubikCubeRotationData<TCubeRotationGroups, TCubeRotationTypes>;
  createRubikCubeShellData(): IRubikCubeShellData<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  >;

  createRubikCubeShellMaterial(): MeshBasicMaterial;
  createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>;

  createRubikCubeGLTFLoader(): IRubikCubeGLTFLoader<
    TCubeShellFilenames,
    TCubePiecesFilenames,
    TCubeFacesTextsFilename
  >;

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

  createRubikCubeFacesTextsBuilder(): IRubikCubeFacesTextsBuilder;

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
    scene: Scene,
    camera: PerspectiveCamera,
  ): IRubikCubeBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFacesNames,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  >;

  createRubikCube(
    scene: Scene,
    camera: PerspectiveCamera,
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: OrbitControls,
  ): Promise<
    IRubikCube<TCubeFacesNames, TCubeRotationGroups, TCubeRotationTypes, TCubeShellFilenames>
  >;
}
