import type { TPieceData } from '../../types/rubik-cube';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubeMaterials } from '../data';
import type { IRubikCubePiece } from '../structure';

export interface IRubikCubePieceBuilder<
  TCubePiecesFilenamesWithFaces extends Record<TCubePiecesFilenames, TCubePiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TCubePiecesFilenames extends
    ExtractStringKeys<TCubePiecesFilenamesWithFaces> = ExtractStringKeys<TCubePiecesFilenamesWithFaces>,
  TCubePiecesFaces extends string = TCubePiecesFilenamesWithFaces[TCubePiecesFilenames],
> {
  createPiece(
    loadedGLTFPieces: Map<TCubePiecesFilenames, GLTF>,
    pieceData: TPieceData<TCubePiecesFilenamesWithFaces, TCubeFaces, TCubePiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
  ): IRubikCubePiece;
}
