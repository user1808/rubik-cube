import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
export interface IRubikCubeGLTFLoader<
  TCubeShellFilenames extends string,
  TCubePiecesFilenames extends string,
> {
  loadGLTFCubePieces(
    filenames: Array<TCubePiecesFilenames>,
  ): Promise<Map<TCubePiecesFilenames, GLTF>>;
  loadGLTFCubeShellPieces(
    filename: Array<TCubeShellFilenames>,
  ): Promise<Map<TCubeShellFilenames, GLTF>>;
}
