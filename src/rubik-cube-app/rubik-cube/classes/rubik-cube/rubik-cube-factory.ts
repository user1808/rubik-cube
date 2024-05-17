import { RubikCubePiecesLoader } from './rubik-cube-pieces-loader';
import { RubikCubePieceBuilder } from './rubik-cube-piece-builder';
import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import type { IRubikCubePieceBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-piece-builder';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { IRubikCubePiecesLoader } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-loader';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import type { IRubikCubeBuilder } from '../../interfaces/rubik-cube-builder';
import type { IRubikCube } from '../../interfaces/structure/rubik-cube';
import { RubikCubeBuilder } from './rubik-cube-builder';
import type { IRubikCubeRotationData } from '../../interfaces/rubik-cube-rotation-data';
import { RubikCubeRotationImplementation } from './rubik-cube-rotation-implementation';
import type { IRubikCubeRotationImplementation } from '../../interfaces/rubik-cube-rotation-implementation';
import type { IRubikCubePieceWrapper } from '../../interfaces/structure/rubik-cube-piece-wrapper';
import { RubikCubePieceWrapper } from './structure/piece/rubik-cube-piece-wrapper';

/**
 * The abstract Rubik's Cube Factory class. It is responsible for creating the Rubik's Cube. It is universal to any Rubik's Cube that I made so far. It have to be extended by a concrete Rubik's Cube Factory class.
 */
export abstract class AbstractRubikCubeFactory<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TCubeRotationGroups extends string,
  TCubeRotationTypes extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> implements
    IRubikCubeFactory<
      TPiecesFilenamesWithFaces,
      TCubeFaces,
      TCubeEdgeFaces,
      TCubeRotationGroups,
      TCubeRotationTypes
    >
{
  /**
   * The Rubik's Cube instance. It is created only once. I implemented this to prevent creating multiple Rubik's Cube instances when it is not necessary.
   */
  private cube: Nullable<IRubikCube<TCubeRotationGroups, TCubeRotationTypes>> = null;

  public abstract get commonName(): string;

  public abstract createRubikCubePiecesData(): IRubikCubePiecesData<
    TPiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeRotationGroups,
    TPiecesFilenames
  >;
  public abstract createRubikCubeRotationData(): IRubikCubeRotationData<
    TCubeRotationGroups,
    TCubeRotationTypes
  >;
  public abstract createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>;

  public createRubikCubePiecesLoader(): IRubikCubePiecesLoader<TPiecesFilenames> {
    return new RubikCubePiecesLoader();
  }
  public createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TPiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  > {
    return new RubikCubePieceBuilder();
  }
  public createRubikCubeBuilder(): IRubikCubeBuilder<
    TPiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeRotationGroups,
    TCubeRotationTypes
  > {
    return new RubikCubeBuilder();
  }

  public createRubikCubeRotationImplementation(): IRubikCubeRotationImplementation {
    return new RubikCubeRotationImplementation();
  }

  public async createRubikCube(): Promise<IRubikCube<TCubeRotationGroups, TCubeRotationTypes>> {
    if (this.cube) return this.cube;

    const piecesData = this.createRubikCubePiecesData();
    const rotationData = this.createRubikCubeRotationData();
    const materials = this.createRubikCubeMaterials();

    const loader = this.createRubikCubePiecesLoader();
    const pieceBuilder = this.createRubikCubePieceBuilder();
    const cubeBuilder = this.createRubikCubeBuilder();

    const rotationImplementation = this.createRubikCubeRotationImplementation();

    const loadedGltfPieces = await loader.loadGltfPieces(piecesData.piecesFilenames);

    const cubePieces: Array<IRubikCubePieceWrapper> = [];

    piecesData.piecesData.forEach((pieceData) => {
      cubePieces.push(
        new RubikCubePieceWrapper(pieceBuilder.createPiece(loadedGltfPieces, pieceData, materials)),
      );
    });

    this.cube = cubeBuilder.createCube(
      cubePieces,
      piecesData,
      rotationData,
      rotationImplementation,
    );
    return this.cube;
  }
}
