import type { IRubikCubeFactory } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-factory';
import type { IRubikCubePieceBuilder } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-piece-builder';
import type { IRubikCubePiecesData } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-data';
import type { IRubikCubePiecesLoader } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-loader';
import { RubikCube } from './structure/cube/rubik-cube';
import { RubikCubePiecesLoader } from './rubik-cube-pieces-loader';
import { RubikCubePieceBuilder } from './rubik-cube-piece-builder';
import type { IRubikCubeMaterials } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-materials';
import type { IRubikCubePiece } from '@/rubik-cube-app/rubik-cube/interfaces/structure/rubik-cube-piece';

/**
 * The abstract Rubik's Cube Factory class. It is responsible for creating the Rubik's Cube. It is universal to any Rubik's Cube that I made so far. It have to be extended by a concrete Rubik's Cube Factory class.
 */
export abstract class AbstractRubikCubeFactory<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> implements IRubikCubeFactory<TPiecesFilenamesWithFaces, TCubeFaces, TCubeEdgeFaces>
{
  /**
   * The Rubik's Cube instance. It is created only once. I implemented this to prevent creating multiple Rubik's Cube instances when it is not necessary.
   */
  private cube: Nullable<RubikCube> = null;

  public abstract get commonName(): string;

  public abstract createRubikCubePiecesData(): IRubikCubePiecesData<
    TPiecesFilenamesWithFaces,
    TCubeFaces,
    TPiecesFilenames
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

  public async createRubikCube(): Promise<RubikCube> {
    if (this.cube) return this.cube;

    const data = this.createRubikCubePiecesData();
    const materials = this.createRubikCubeMaterials();

    const loader = this.createRubikCubePiecesLoader();
    const builder = this.createRubikCubePieceBuilder();

    const loadedGltfPieces = await loader.loadGltfPieces(data.piecesFilenames);

    const cubePieces: Array<IRubikCubePiece> = [];

    data.piecesData.forEach((pieceData) => {
      cubePieces.push(builder.createPiece(loadedGltfPieces, pieceData, materials));
    });

    this.cube = new RubikCube(cubePieces);
    return this.cube;
  }
}
