import type { Vector3, Euler } from 'three';
import type { TPieceId } from './piece-id';

export type TPieceData<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> = {
  [TPieceFilename in TCubePiecesFilenames]: {
    id: TPieceId;
    position: Vector3;
    rotation: Euler;
    filename: TPieceFilename;
    pieceFacesToCubeFaces: Partial<
      Record<TCubePiecesFilenamesWithFaces[TPieceFilename], TCubeFacesNames>
    >;
  };
}[TCubePiecesFilenames];
