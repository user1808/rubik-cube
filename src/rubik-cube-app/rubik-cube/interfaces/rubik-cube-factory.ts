import type { RubikCube } from '../classes/rubik-cube/structure/cube/rubik-cube';
import type { IRubikCubeMaterials } from './rubik-cube-materials';
import type { IRubikCubePieceBuilder } from './rubik-cube-piece-builder';
import type { IRubikCubePiecesData } from './rubik-cube-pieces-data';
import type { IRubikCubePiecesLoader } from './rubik-cube-pieces-loader';

export interface IRubikCubeFactory<
  TPiecesFilenames extends string = string,
  TCubeFaces extends string = string,
> {
  get commonName(): string;

  createRubikCubePiecesData(): IRubikCubePiecesData<TPiecesFilenames>;
  createRubikCubePiecesLoader(): IRubikCubePiecesLoader<TPiecesFilenames>;
  createRubikCubePieceBuilder(): IRubikCubePieceBuilder<TPiecesFilenames>;
  createRubikCubeMaterials(): IRubikCubeMaterials<TCubeFaces>;

  createRubikCube(): Promise<RubikCube>;
}
