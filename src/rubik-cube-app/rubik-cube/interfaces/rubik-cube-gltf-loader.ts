import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
export interface IRubikCubeGLTFLoader<
  TCubeShellFilename extends string,
  TCubePiecesFilenames extends string,
> {
  loadGLTFCubeShell(filename: TCubeShellFilename): Promise<GLTF>;
  loadGLTFCubePieces(
    filenames: Array<TCubePiecesFilenames>,
  ): Promise<Map<TCubePiecesFilenames, GLTF>>;
}
