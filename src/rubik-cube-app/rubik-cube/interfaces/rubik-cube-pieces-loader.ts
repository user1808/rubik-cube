import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
/**
 * Represents a loader of the Rubik's Cube pieces.
 *
 * @template TPiecesFilenames The type of the filenames of the pieces.
 * @example
 * type TRubikCubePiecesFilenames = 'SomeCubePiece1.glb' | 'SomeCubePiece2.glb' | ...
 */
export interface IRubikCubePiecesLoader<TPiecesFilenames extends string> {
  /**
   * Loads the pieces of the Rubik's Cube. The pieces are represented by GLTF objects.
   * @param filenames The filenames of the pieces to load.
   * @returns A promise that resolves with a map where the keys are the filenames of the pieces and the values are the GLTF objects of the pieces.
   */
  loadGltfPieces(filenames: Array<TPiecesFilenames>): Promise<Map<TPiecesFilenames, GLTF>>;
}
