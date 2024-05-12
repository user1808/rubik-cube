import type { TPieceData } from '../types/rubik-cube/piece-data';

export interface IRubikCubePiecesData<
  TPiecesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TPiecesFilenames extends string = Extract<keyof TPiecesWithFaces, string>,
  TPiecesFaces extends string = string,
> {
  get piecesFilenames(): Array<TPiecesFilenames>;
  get piecesData(): Array<TPieceData<TPiecesWithFaces, TCubeFaces>>;
}
