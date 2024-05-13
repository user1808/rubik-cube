import type { RubikCubePiece } from '../classes/rubik-cube/structure/piece/rubik-cube-piece';
import type { TPieceData } from '../types/rubik-cube/piece-data';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubeMaterials } from './rubik-cube-materials';

export interface IRubikCubePieceBuilder<
  TPiecesWithFaces extends Record<TPiecesFilenames, TPiecesFaces>,
  TCubeFaces extends string,
  TPiecesFilenames extends Extract<keyof TPiecesWithFaces, string> = Extract<
    keyof TPiecesWithFaces,
    string
  >,
  TPiecesFaces extends string = string,
> {
  createPiece(
    pieceData: TPieceData<TPiecesWithFaces, TCubeFaces, TPiecesFilenames>,
    loadedGltfPieces: Map<TPiecesFilenames, GLTF>,
    materials: IRubikCubeMaterials<TCubeFaces>,
  ): RubikCubePiece;
}
