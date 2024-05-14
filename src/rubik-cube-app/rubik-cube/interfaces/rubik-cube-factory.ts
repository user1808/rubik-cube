import type { RubikCube } from '../classes/rubik-cube/structure/cube/rubik-cube';
import type { IRubikCubeMaterials } from './rubik-cube-materials';
import type { IRubikCubePieceBuilder } from './rubik-cube-piece-builder';
import type { IRubikCubePiecesData } from './rubik-cube-pieces-data';
import type { IRubikCubePiecesLoader } from './rubik-cube-pieces-loader';

export interface IRubikCubeFactory<
  TPiecesWithFaces extends Record<TPiecesFilenames, TPiecesFaces> = any,
  TCubeFaces extends string = string,
  TCubeEdgeFaces extends string = string,
  TPiecesFilenames extends string = Extract<keyof TPiecesWithFaces, string>,
  TPiecesFaces extends string = string,
> {
  get commonName(): string;

  createRubikCubePiecesData(): IRubikCubePiecesData<TPiecesWithFaces, TCubeFaces>;
  createRubikCubePiecesLoader(): IRubikCubePiecesLoader<TPiecesWithFaces>;
  createRubikCubePieceBuilder(): IRubikCubePieceBuilder<
    TPiecesWithFaces,
    TCubeFaces,
    TCubeEdgeFaces
  >;
  createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>;

  createRubikCube(): Promise<RubikCube>;
}
