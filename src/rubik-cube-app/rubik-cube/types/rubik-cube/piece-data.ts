import * as THREE from 'three';

export type TPieceData<
  TPiecesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TPiecesFilenames extends string = Extract<keyof TPiecesWithFaces, string>,
  TPiecesFaces extends string = TPiecesWithFaces[TPiecesFilenames],
> = {
  [TPieceFilename in TPiecesFilenames]: {
    id: number;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    filename: TPieceFilename;
    pieceFacesToCubeFaces: Partial<Record<TPiecesWithFaces[TPieceFilename], TCubeFaces>>;
  };
}[TPiecesFilenames];
