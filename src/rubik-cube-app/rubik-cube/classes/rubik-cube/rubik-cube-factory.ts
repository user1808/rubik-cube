import * as THREE from 'three';
import { RubikCubeGLTFLoader } from './rubik-cube-gltf-loader';
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import type { IRubikCubeGLTFLoader } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-gltf-loader';
import { RubikCubeBuilder } from './builders/rubik-cube-builder';
import { RubikCubeRotationImplementation } from './rubik-cube-rotation-implementation';
import type { IRubikCubeRotationImplementation } from '../../interfaces/rubik-cube-rotation-implementation';
import type { IRubikCubeShellData } from '../../interfaces/data/rubik-cube-shell-data';
import type {
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
} from '../../interfaces/data';
import type {
  IRubikCubeBuilder,
  IRubikCubePieceBuilder,
  IRubikCubeShellBuilder,
} from '../../interfaces/builders';
import type { IRubikCube, IRubikCubePieceWrapper } from '../../interfaces/structure';
import { RubikCubePieceBuilder, RubikCubeShellBuilder } from './builders';
import type { IRubikCubeShellPiecesBuilder } from '../../interfaces/builders/rubik-cube-shell-pieces-builder';
import { RubikCubeShellPiecesBuilder } from './builders/rubik-cube-shell-pieces-builder';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubePiecesBuilder } from '../../interfaces/builders/rubik-cube-pieces-builder';
import { RubikCubePiecesBuilder } from './builders/rubik-cube-pieces-builder';
import type { IRubikCubeRotationGroupsBuilder } from '../../interfaces/builders/rubik-cube-rotation-groups-builder';
import { RubikCubeRotationGroupsBuidler } from './builders/rubik-cube-rotation-groups-builder';

export abstract class AbstractRubikCubeFactory<
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
    IRubikCubeFactory<
      TCubePiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeEdgeFaces,
      TCubeRotationGroups,
      TCubeRotationTypes,
      TCubeShellFilename,
      TCubeShellPieces
    >
{
  constructor(private readonly scene: THREE.Scene) {}

  private cube: Nullable<IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>> =
    null;

  public abstract get commonName(): string;

  public abstract createRubikCubePiecesData(): IRubikCubePiecesData<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeRotationGroups,
    TCubePiecesFilenames
  >;
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
  public abstract createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>;

  public createRubikCubeGLTFLoader(): IRubikCubeGLTFLoader<
    TCubeShellFilename,
    TCubePiecesFilenames
  > {
    return new RubikCubeGLTFLoader();
  }

  public createRubikCubeShellPiecesBuilder(
    loadedGLTFCubeShell: GLTF,
  ): IRubikCubeShellPiecesBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces> {
    const shellData = this.createRubikCubeShellData();
    return new RubikCubeShellPiecesBuilder(loadedGLTFCubeShell, shellData.piecesData);
  }
  public createRubikCubeShellBuilder(
    loadedGLTFCubeShell: GLTF,
  ): IRubikCubeShellBuilder<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces> {
    const shellPiecesBuilder = this.createRubikCubeShellPiecesBuilder(loadedGLTFCubeShell);
    return new RubikCubeShellBuilder(shellPiecesBuilder);
  }
  public createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  > {
    return new RubikCubePieceBuilder();
  }
  public createRubikCubePiecesBuilder(
    loadedGLTFPieces: Map<TCubePiecesFilenames, GLTF>,
  ): IRubikCubePiecesBuilder {
    const pieceBuilder = this.createRubikCubePieceBuilder();
    const materials = this.createRubikCubeMaterials();
    const { piecesData } = this.createRubikCubePiecesData();
    return new RubikCubePiecesBuilder(pieceBuilder, loadedGLTFPieces, materials, piecesData);
  }
  public createRubikCubeRotationGroupsBuilder(): IRubikCubeRotationGroupsBuilder<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    const { rotationGroupsPiecesIdxs } = this.createRubikCubePiecesData();
    return new RubikCubeRotationGroupsBuidler(rotationGroupsPiecesIdxs);
  }
  public createRubikCubeBuilder(
    loadedGLTFCubeShell: GLTF,
    loadedGLTFPieces: Map<TCubePiecesFilenames, GLTF>,
  ): IRubikCubeBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    const shellBuilder = this.createRubikCubeShellBuilder(loadedGLTFCubeShell);
    const piecesBuilder = this.createRubikCubePiecesBuilder(loadedGLTFPieces);
    const rotationGroupsBuilder = this.createRubikCubeRotationGroupsBuilder();
    const rotationData = this.createRubikCubeRotationData();
    const rotationImplementation = this.createRubikCubeRotationImplementation();
    return new RubikCubeBuilder(
      this.scene,
      shellBuilder,
      piecesBuilder,
      rotationGroupsBuilder,
      rotationData,
      rotationImplementation,
    );
  }

  public createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    return new RubikCubeRotationImplementation();
  }

  public async createRubikCube(): Promise<
    IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>
  > {
    if (this.cube) return this.cube;

    const shellData = this.createRubikCubeShellData();
    const piecesData = this.createRubikCubePiecesData();

    const gltfLoader = this.createRubikCubeGLTFLoader();
    const loadedGLTFCubeShell = await gltfLoader.loadGLTFCubeShell(shellData.filename);
    const loadedGLTFPieces = await gltfLoader.loadGLTFCubePieces(piecesData.piecesFilenames);
    const cubeBuilder = this.createRubikCubeBuilder(loadedGLTFCubeShell, loadedGLTFPieces);

    this.cube = cubeBuilder.buildCube();
    return this.cube;
  }
}
