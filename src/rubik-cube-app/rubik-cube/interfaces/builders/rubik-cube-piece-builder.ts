import type { Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { TPieceData } from '../../types/rubik-cube';
import type { IRubikCubeMaterials } from '../data';
import type { IRubikCubePiece } from '../structure';

export interface IRubikCubePieceBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFacesNames extends string,
  TCubeEdgeFacesNames extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> {
  buildPiece(
    loadedGLTFPieces: Map<TCubePiecesFilenames, GLTF>,
    pieceData: TPieceData<TCubePiecesFilenamesWithFaces, TCubeFacesNames, TCubePiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFacesNames, TCubeEdgeFacesNames>,
    cubeFacesNormalVectors: Record<TCubeFacesNames, Vector3>,
  ): IRubikCubePiece<TCubeFacesNames>;
}
