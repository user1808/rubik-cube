import * as THREE from 'three';
import type { TPieceDataId } from '.';

export type TPieceData<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFaces extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> = {
  [TPieceFilename in TCubePiecesFilenames]: {
    id: TPieceDataId;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    filename: TPieceFilename;
    pieceFacesToCubeFaces: Partial<
      Record<TCubePiecesFilenamesWithFaces[TPieceFilename], TCubeFaces>
    >;
  };
}[TCubePiecesFilenames];
