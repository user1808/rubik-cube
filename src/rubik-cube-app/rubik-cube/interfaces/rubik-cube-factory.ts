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
import type { IRubikCubeColorRaycaster } from './rubik-cube-color-raycaster';
import type { CustomOrbitControls } from '@/rubik-cube-app/common/custom';

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
  readonly commonName: TCubeCommonName;
  readonly cameraMinDistance: number;
  readonly rotationGroups: Readonly<Array<TCubeRotationGroups>>;
  readonly rotationTypesNames: Readonly<Array<TCubeRotationTypes>>;
  readonly facesTextsFilename: TCubeFacesTextsFilename;

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
  createRubikCubePiecesBuilder(): IRubikCubePiecesBuilder<TCubeFacesNames, TCubeEdgeFacesNames>;

  createRubikCubeFacesBuilder(): IRubikCubeFacesBuilder<TCubeFacesNames>;

  createRubikCubeRotationGroupsBuilder(): IRubikCubeRotationGroupsBuilder<
    TCubeFacesNames,
    TCubeRotationGroups
  >;

  createRubikCubeFacesTextsBuilder(): IRubikCubeFacesTextsBuilder;

  createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeCommonName,
    TCubeFacesNames,
    TCubeEdgeFacesNames,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  >;

  createRubikCubeRotationRaycaster(
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: OrbitControls,
  ): IRubikCubeRotationRaycaster;

  createRubikCubeColorRaycaster(
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: CustomOrbitControls,
  ): IRubikCubeColorRaycaster;

  createRubikCubeBuilder(
    scene: Scene,
    camera: PerspectiveCamera,
  ): IRubikCubeBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeCommonName,
    TCubeFacesNames,
    TCubeEdgeFacesNames,
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
    IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >
  >;
}
