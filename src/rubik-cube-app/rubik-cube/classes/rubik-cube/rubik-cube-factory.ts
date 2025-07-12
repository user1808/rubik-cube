import type { Scene, PerspectiveCamera } from 'three';
import { MeshBasicMaterial } from 'three';
import type { MouseTouchTracker } from '@/rubik-cube-app/common';
import type { CustomOrbitControls } from '@/rubik-cube-app/common/custom/custom-orbit-controls';
import type { IRubikCubeShellData } from '../../interfaces/data/rubik-cube-shell-data';
import type { IRubikCube } from '../../interfaces/structure';
import type { TCubeCommonNames } from '../../types/cube-common-name';
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
import { RubikCubeFacesTextsBuilder } from './builders/rubik-cube-faces-texts-builder';
import type { IRubikCubeFacesTextsBuilder } from '../../interfaces/builders/rubik-cube-faces-texts-builder';
import { RubikCubeColorRaycaster } from './rubik-cube-color-raycaster';
import type { IRubikCubeColorRaycaster } from '../../interfaces/rubik-cube-color-raycaster';

export abstract class AbstractRubikCubeFactory<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeCommonName extends TCubeCommonNames,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TCubeShellFilenames extends string,
  TCubeFacesTextsFilename extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> implements
    IRubikCubeFactory<
      TCubePiecesFilenamesWithFaces,
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames,
      TCubeFacesTextsFilename
    >
{
  private cube: Nullable<
    IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >
  > = null;
  private gltfLoader: Nullable<
    IRubikCubeGLTFLoader<TCubeShellFilenames, TCubePiecesFilenames, TCubeFacesTextsFilename>
  > = null;

  public abstract readonly commonName: TCubeCommonName;
  public abstract readonly cameraMinDistance: number;
  public abstract readonly facesNames: Readonly<Array<TCubeFacesNames>>;
  public abstract readonly rotationTypesNames: Readonly<Array<TCubeRotationTypes>>;
  public abstract readonly facesTextsFilename: TCubeFacesTextsFilename;

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
    TCubeShellFilenames
  >;
  public abstract createRubikCubeMaterials(): IRubikCubeMaterials<
    TCubeFacesNames,
    TCubeEdgeFacesNames
  >;

  public createRubikCubeShellMaterial(): MeshBasicMaterial {
    return new MeshBasicMaterial({ transparent: true, opacity: 0 });
  }

  public createRubikCubeGLTFLoader(): IRubikCubeGLTFLoader<
    TCubeShellFilenames,
    TCubePiecesFilenames,
    TCubeFacesTextsFilename
  > {
    if (this.gltfLoader) return this.gltfLoader;

    this.gltfLoader = new RubikCubeGLTFLoader();
    return this.gltfLoader;
  }

  public createRubikCubeShellPiecesBuilder(): IRubikCubeShellPiecesBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  > {
    const gltfLoader = this.createRubikCubeGLTFLoader();
    const material = this.createRubikCubeShellMaterial();
    const shellData = this.createRubikCubeShellData();
    return new RubikCubeShellPiecesBuilder(gltfLoader, material, shellData);
  }
  public createRubikCubeShellBuilder(): IRubikCubeShellBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
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
  public createRubikCubePiecesBuilder(): IRubikCubePiecesBuilder<
    TCubeFacesNames,
    TCubeEdgeFacesNames
  > {
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

  public createRubikCubeFacesTextsBuilder(): IRubikCubeFacesTextsBuilder {
    const gltfLoader = this.createRubikCubeGLTFLoader();
    return new RubikCubeFacesTextsBuilder(gltfLoader, this.facesTextsFilename);
  }

  public createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeCommonName,
    TCubeFacesNames,
    TCubeEdgeFacesNames,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilenames
  > {
    const rotationData = this.createRubikCubeRotationData();
    return new RubikCubeRotationImplementation(rotationData);
  }

  public createRubikCubeRotationRaycaster(
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: CustomOrbitControls,
  ): IRubikCubeRotationRaycaster {
    if (!this.cube) throw new Error('Cube is not created yet');
    return new RubikCubeRotationRaycaster(this.cube, mouseTouchTracker, orbitControls);
  }

  public createRubikCubeColorRaycaster(
    mouseTouchTracker: MouseTouchTracker,
  ): IRubikCubeColorRaycaster {
    if (!this.cube) throw new Error('Cube is not created yet');
    return new RubikCubeColorRaycaster(this.cube, mouseTouchTracker);
  }

  public createRubikCubeBuilder(
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
  > {
    const shellBuilder = this.createRubikCubeShellBuilder();
    const piecesBuilder = this.createRubikCubePiecesBuilder();
    const facesBuilder = this.createRubikCubeFacesBuilder();
    const rotationGroupsBuilder = this.createRubikCubeRotationGroupsBuilder();
    const facesTextsBuilder = this.createRubikCubeFacesTextsBuilder();

    const rotationImplementation = this.createRubikCubeRotationImplementation();

    return new RubikCubeBuilder(
      {
        commonName: this.commonName,
        cameraMinDistance: this.cameraMinDistance,
        facesNames: this.facesNames,
        rotationTypesNames: this.rotationTypesNames,
      },
      scene,
      camera,
      shellBuilder,
      piecesBuilder,
      facesBuilder,
      rotationGroupsBuilder,
      facesTextsBuilder,
      rotationImplementation,
    );
  }

  public async createRubikCube(
    scene: Scene,
    camera: PerspectiveCamera,
    mouseTouchTracker: MouseTouchTracker,
    orbitControls: CustomOrbitControls,
  ): Promise<
    IRubikCube<
      TCubeCommonName,
      TCubeFacesNames,
      TCubeEdgeFacesNames,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilenames
    >
  > {
    if (this.cube) return this.cube;

    const cubeBuilder = this.createRubikCubeBuilder(scene, camera);

    this.cube = await cubeBuilder.buildCube();
    this.cube.setRotationRaycaster(
      this.createRubikCubeRotationRaycaster(mouseTouchTracker, orbitControls),
    );
    this.cube.setColorRaycaster(this.createRubikCubeColorRaycaster(mouseTouchTracker));
    return this.cube;
  }
}
