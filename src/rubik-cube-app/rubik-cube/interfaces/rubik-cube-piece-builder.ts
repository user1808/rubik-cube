import type { RubikCubePiece } from '../classes/rubik-cube/structure/piece/rubik-cube-piece';
import type { TPieceData } from '../types/rubik-cube/piece-data';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface IRubikCubePieceBuilder<TPiecesFilenames extends string> {
  createPiece(
    pieceData: TPieceData<TPiecesFilenames>,
    loadedGltfPieces: Map<TPiecesFilenames, GLTF>,
  ): RubikCubePiece;
}
