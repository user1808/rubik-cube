import type { TPieceData, TPieceDataIdx } from '../../types/rubik-cube';

export interface IRubikCubePiecesData<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFaces extends string,
  TCubeRotationGroups extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> {
  readonly piecesFilenames: Array<TCubePiecesFilenames>;
  readonly piecesData: Array<TPieceData<TCubePiecesFilenamesWithFaces, TCubeFaces>>;
  readonly rotationGroupsPiecesIdxs: Record<TCubeRotationGroups, Array<TPieceDataIdx>>;
}
