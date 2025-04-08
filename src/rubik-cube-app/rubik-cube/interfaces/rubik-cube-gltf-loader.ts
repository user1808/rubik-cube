import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
// TODO: add type for TCubeFacesTextsFilename
export interface IRubikCubeGLTFLoader<
  TCubeShellFilenames extends string,
  TCubePiecesFilenames extends string,
  TCubeFacesTextsFilename extends string,
> {
  loadGLTFCubePieces(
    filenames: Array<TCubePiecesFilenames>,
  ): Promise<Map<TCubePiecesFilenames, GLTF>>;
  loadGLTFCubeShellPieces(
    filename: Array<TCubeShellFilenames>,
  ): Promise<Map<TCubeShellFilenames, GLTF>>;
  loadGLTFCubeFacesTexts(filename: TCubeFacesTextsFilename): Promise<GLTF>;
}
