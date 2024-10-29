import type { TPieceData } from '../../types/rubik-cube';

export interface IRubikCubePiecesData<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> {
  readonly piecesFilenames: Array<TCubePiecesFilenames>;
  readonly piecesInitData: Array<TPieceData<TCubePiecesFilenamesWithFaces, TCubeFacesNames>>;
  readonly facesNormalVectors: Record<TCubeFacesNames, THREE.Vector3>;
}
