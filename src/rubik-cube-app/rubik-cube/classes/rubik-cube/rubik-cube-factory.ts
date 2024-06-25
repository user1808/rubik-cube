import { RubikCubeGLTFLoader } from './rubik-cube-gltf-loader';
import { RubikCubePieceBuilder } from './rubik-cube-piece-builder';
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import type { IRubikCubeGLTFLoader } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-gltf-loader';
import { RubikCubeBuilder } from './rubik-cube-builder';
import { RubikCubeRotationImplementation } from './rubik-cube-rotation-implementation';
import type { IRubikCubeRotationImplementation } from '../../interfaces/rubik-cube-rotation-implementation';
import type { IRubikCubeShellData } from '../../interfaces/data/rubik-cube-shell-data';
import type {
  IRubikCubeMaterials,
  IRubikCubePiecesData,
  IRubikCubeRotationData,
} from '../../interfaces/data';
import type { IRubikCubeBuilder, IRubikCubePieceBuilder } from '../../interfaces/builders';
import type { IRubikCube } from '../../interfaces/structure';

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
  public createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  > {
    return new RubikCubePieceBuilder();
  }
  public createRubikCubeBuilder(): IRubikCubeBuilder<
    TCubePiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces,
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellFilename,
    TCubeShellPieces
  > {
    return new RubikCubeBuilder();
  }

  public createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation<
    TCubeRotationGroups,
    TCubeRotationTypes,
    TCubeShellPieces
  > {
    return new RubikCubeRotationImplementation();
  }

  public async createRubikCube(
    scene: THREE.Scene,
  ): Promise<IRubikCube<TCubeRotationGroups, TCubeRotationTypes, TCubeShellPieces>> {
    if (this.cube) return this.cube;

    const shellData = this.createRubikCubeShellData();
    const piecesData = this.createRubikCubePiecesData();
    const rotationData = this.createRubikCubeRotationData();
    const materials = this.createRubikCubeMaterials();

    const gltfLoader = this.createRubikCubeGLTFLoader();
    const pieceBuilder = this.createRubikCubePieceBuilder();
    const cubeBuilder = this.createRubikCubeBuilder();

    const rotationImplementation = this.createRubikCubeRotationImplementation();

    this.cube = await cubeBuilder.buildCube(
      scene,
      gltfLoader,
      pieceBuilder,
      materials,
      shellData,
      piecesData,
      rotationData,
      rotationImplementation,
    );
    return this.cube;
  }
}
