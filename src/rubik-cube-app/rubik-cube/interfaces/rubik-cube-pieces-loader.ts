import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface IRubikCubePiecesLoader<
  TPiecesWithFaces extends Record<TPiecesFilenames, string>,
  TPiecesFilenames extends string = Extract<keyof TPiecesWithFaces, string>,
> {
  loadGltfPieces(filenames: Array<TPiecesFilenames>): Promise<Map<TPiecesFilenames, GLTF>>;
}
