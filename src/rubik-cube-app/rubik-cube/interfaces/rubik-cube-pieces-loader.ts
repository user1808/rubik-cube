import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface IRubikCubePiecesLoader<TPiecesFilenames extends string> {
  loadGltfPieces(filenames: Array<TPiecesFilenames>): Promise<Map<TPiecesFilenames, GLTF>>;
}
