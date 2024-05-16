import type { TPieceData } from '../types/rubik-cube/piece-data';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubeMaterials } from './rubik-cube-materials';
import type { IRubikCubePiece } from './structure/rubik-cube-piece';

/**
 * Represents a builder of a piece of the Rubik's Cube.
 *
 * For more informations about the types, see the {@link TPieceData} type.
 */
export interface IRubikCubePieceBuilder<
  TPiecesFilenamesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TCubeEdgeFaces extends string,
  TPiecesFilenames extends
    ExtractStringKeys<TPiecesFilenamesWithFaces> = ExtractStringKeys<TPiecesFilenamesWithFaces>,
  TPiecesFaces extends string = TPiecesFilenamesWithFaces[TPiecesFilenames],
> {
  /**
   * Creates a piece of the Rubik's Cube.
   * @param loadedGltfPieces The loaded GLTF pieces.
   * @param pieceData The data of the piece.
   * @param materials The materials of the Rubik's Cube.
   *
   * @returns The created piece.
   */
  createPiece(
    loadedGltfPieces: Map<TPiecesFilenames, GLTF>,
    pieceData: TPieceData<TPiecesFilenamesWithFaces, TCubeFaces, TPiecesFilenames>,
    materials: IRubikCubeMaterials<TCubeFaces, TCubeEdgeFaces>,
  ): IRubikCubePiece;
}
