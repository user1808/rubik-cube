import type { TRubikCubePieceBasicData } from '../classes/RubikCube/RubikCubeStructure/RubikCubePiece';

export type TRubikCubePieceIdx = number;

export interface IRubikCubeData<FacesNames extends string> {
  get piecesBasicData(): Array<TRubikCubePieceBasicData>;
  get initFacesPiecesIdx(): Record<FacesNames, Array<TRubikCubePieceIdx>>;
}
