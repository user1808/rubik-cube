import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { MouseTouchTracker } from '@/rubik-cube-app/common';
import type { IRubikCubeShellData } from '../../interfaces/data/rubik-cube-shell-data';
import type { IRubikCube } from '../../interfaces/structure';
import type {
  IRubikCubeFactory,
  IRubikCubeGLTFLoader,
  IRubikCubeRotationImplementation,
  IRubikCubeRotationRaycaster,
} from '../../interfaces';
import type {
  IRubikCubeFacesData,
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
  IRubikCubeRotationGroupsData,
} from '../../interfaces/data';
import type {
  IRubikCubeBuilder,
  IRubikCubeFacesBuilder,
  IRubikCubePieceBuilder,
  IRubikCubePiecesBuilder,
  IRubikCubeRotationGroupsBuilder,
  IRubikCubeShellBuilder,
  IRubikCubeShellPiecesBuilder,
} from '../../interfaces/builders';
import {
  RubikCubeFacesBuilder,
  RubikCubePieceBuilder,
  RubikCubePiecesBuilder,
  RubikCubeRotationGroupsBuidler,
  RubikCubeShellBuilder,
  RubikCubeShellPiecesBuilder,
} from './builders';
import { RubikCubeGLTFLoader } from './rubik-cube-gltf-loader';
import { RubikCubeBuilder } from './builders/rubik-cube-builder';
import { RubikCubeRotationImplementation } from './rubik-cube-rotation-implementation';
import { RubikCubeRotationRaycaster } from './rubik-cube-rotation-raycaster';

export abstract class AbstractRubikCubeFactory<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilename extends string,
  TCubeShellPieces extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements
    IRubikCubeFactory<
      TCubePiecesFilenamesWithFaces,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >
{
  private cube: Nullable<
    IRubikCube<TCubeFacesNames, TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
  > = null;
  private gltfLoader: Nullable<IRubikCubeGLTFLoader<TCubeShellFilename, TCubePiecesFilenames>> =
    null;

  public abstract get commonName(): string;

  public abstract createRubikCubePiecesData(): IRubikCubePiecesData<
    TCubePiecesFilenamesWithFaces,
    TCubeFacesNames,
    TCubePiecesFilenames
  >;
  public abstract createRubikCubeFacesData(): IRubikCubeFacesData<TCubeFacesNames>;
  public abstract createRubikCubeRotationGroupsData(): IRubikCubeRotationGroupsData<TCubeRotationGroups>;
  public abstract createRubikCubeRotationData(): IRubikCubeRotationData<
    TCubeRotationGroups,
    TCubeRotationTypes
  >;
  public abstract createRubikCubeShellData(): IRubikCubeShellData<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilename,
    TCubeShellPieces
  >;
  public abstract createRubikCubeMaterials(): IRubikCubeMaterials<
    TCubeFacesNames,
    TCubeEdgeFacesNames
  >;

  public createRubikCubeShellMaterial(): THREE.MeshBasicMaterial {
    return new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
  }

  public createRubikCubeGLTFLoader(): IRubikCubeGLTFLoader<
    TCubeShellFilename,
    TCubePiecesFilenames
  > {
    if (this.gltfLoader) return this.gltfLoader;

    this.gltfLoader = new RubikCubeGLTFLoader();
    return this.gltfLoader;
  }

  public createRubikCubeShellPiecesBuilder(): IRubikCubeShellPiecesBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    const gltfLoader = this.createRubikCubeGLTFLoader();
    const material = this.createRubikCubeShellMaterial();
    const shellData = this.createRubikCubeShellData();
    return new RubikCubeShellPiecesBuilder(gltfLoader, material, shellData);
  }
  public createRubikCubeShellBuilder(): IRubikCubeShellBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    const shellPiecesBuilder = this.createRubikCubeShellPiecesBuilder();
    return new RubikCubeShellBuilder(shellPiecesBuilder);
  }

  public createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFacesNames,
    TCubeEdgeFacesNames
  > {
    return new RubikCubePieceBuilder();
  }
  public createRubikCubePiecesBuilder(): IRubikCubePiecesBuilder<TCubeFacesNames> {
    const gltfLoader = this.createRubikCubeGLTFLoader();
    const pieceBuilder = this.createRubikCubePieceBuilder();
    const materials = this.createRubikCubeMaterials();
    const piecesData = this.createRubikCubePiecesData();
    return new RubikCubePiecesBuilder(gltfLoader, materials, pieceBuilder, piecesData);
  }

  public createRubikCubeFacesBuilder(): IRubikCubeFacesBuilder<TCubeFacesNames> {
    const facesData = this.createRubikCubeFacesData();
    return new RubikCubeFacesBuilder(facesData);
  }

  public createRubikCubeRotationGroupsBuilder(): IRubikCubeRotationGroupsBuilder<
    TCubeFacesNames,
    TCubeRotationGroups
  > {
    const rotationGroupsData = this.createRubikCubeRotationGroupsData();
    return new RubikCubeRotationGroupsBuidler(rotationGroupsData);
  }

  public createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeFacesNames,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    const rotationData = this.createRubikCubeRotationData();
    return new RubikCubeRotationImplementation(rotationData);
  }

  public createRubikCubeRotationRaycaster(
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: OrbitControls,
  ): IRubikCubeRotationRaycaster {
    if (!this.cube) throw new Error('Cube is not created yet');
    return new RubikCubeRotationRaycaster(this.cube, mouseTouchTracker, orbitControls);
  }

  public createRubikCubeBuilder(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
  ): IRubikCubeBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFacesNames,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    const shellBuilder = this.createRubikCubeShellBuilder();
    const piecesBuilder = this.createRubikCubePiecesBuilder();
    const facesBuilder = this.createRubikCubeFacesBuilder();
    const rotationGroupsBuilder = this.createRubikCubeRotationGroupsBuilder();

    const rotationImplementation = this.createRubikCubeRotationImplementation();

    return new RubikCubeBuilder(
      scene,
      camera,
      shellBuilder,
      piecesBuilder,
      facesBuilder,
      rotationGroupsBuilder,
      rotationImplementation,
    );
  }

  public async createRubikCube(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: OrbitControls,
  ): Promise<
    IRubikCube<TCubeFacesNames, TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
  > {
    if (this.cube) return this.cube;

    const cubeBuilder = this.createRubikCubeBuilder(scene, camera);

    this.cube = await cubeBuilder.buildCube();
    this.cube.setRotationRaycaster(
      this.createRubikCubeRotationRaycaster(mouseTouchTracker, orbitControls),
    );
    return this.cube;
  }
}
