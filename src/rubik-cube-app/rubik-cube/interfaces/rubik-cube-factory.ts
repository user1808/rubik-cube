import type { IRubikCube } from './structure/rubik-cube';
import type { IRubikCubeMaterials } from './rubik-cube-materials';
import type { IRubikCubePieceBuilder } from './rubik-cube-piece-builder';
import type { IRubikCubePiecesData } from './rubik-cube-pieces-data';
import type { IRubikCubePiecesLoader } from './rubik-cube-pieces-loader';

/**
 * Alias for the Rubik's Cube Factory that is universal to any Rubik's Cube.
 */
export type TUniversalRubikCubeFactory = IRubikCubeFactory<Record<string, string>, string, string>;

/**
 * Represents a factory of the Rubik's Cube. It is used to create the Rubik's Cube.
 *
 * For more informations about the types, see the {@link IRubikCubePiecesData}, {@link IRubikCubePiecesLoader}, {@link IRubikCubePieceBuilder} and {@link IRubikCubeMaterials} types.
 */
export interface IRubikCubeFactory<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> {
  /**
   * The common name of the Rubik's Cube.
   */
  get commonName(): string;

  /**
   * Creates the data of the Rubik's Cube pieces.
   */
  createRubikCubePiecesData(): IRubikCubePiecesData<TPiecesFilenamesWithFaces, TCubeFaces>;
  /**
   * Creates the loader of the Rubik's Cube pieces.
   */
  createRubikCubePiecesLoader(): IRubikCubePiecesLoader<TPiecesFilenames>;
  /**
   * Creates the builder of the Rubik's Cube pieces.
   */
  createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TPiecesFilenamesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  >;
  /**
   * Creates the materials of the Rubik's Cube.
   */
  createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>;

  /**
   * Creates the Rubik's Cube.
   */
  createRubikCube(): Promise<IRubikCube>;
}
