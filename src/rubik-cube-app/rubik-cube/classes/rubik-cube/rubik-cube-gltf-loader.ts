import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubeGLTFLoader } from '../../interfaces';

export class RubikCubeGLTFLoader<
  TShellFilenames extends string,
  TPiecesFilenames extends string,
  TCubeFacesTextsFilename extends string,
> implements IRubikCubeGLTFLoader<TShellFilenames, TPiecesFilenames, TCubeFacesTextsFilename>
{
  private readonly FOLDER_WITH_MODELS: string = 'models';
  private readonly gltfLoader: GLTFLoader = new GLTFLoader();

  public async loadGLTFCubePieces(
    filenames: Array<TPiecesFilenames>,
  ): Promise<Map<TPiecesFilenames, GLTF>> {
    const gltfPiecesMap: Map<TPiecesFilenames, GLTF> = new Map();

    for (const filename of filenames) {
      const gltfPiece = await this.gltfLoader.loadAsync(`${this.FOLDER_WITH_MODELS}/${filename}`);
      gltfPiecesMap.set(filename, gltfPiece);
    }

    if (filenames.length != gltfPiecesMap.size) {
      throw new Error('Not all files was loaded!');
    }

    return gltfPiecesMap;
  }

  public async loadGLTFCubeShellPieces(
    filenames: Array<TShellFilenames>,
  ): Promise<Map<TShellFilenames, GLTF>> {
    const gltfShellMap: Map<TShellFilenames, GLTF> = new Map();

    for (const filename of filenames) {
      const gltfShell = await this.gltfLoader.loadAsync(`${this.FOLDER_WITH_MODELS}/${filename}`);
      gltfShellMap.set(filename, gltfShell);
    }

    if (filenames.length != gltfShellMap.size) {
      throw new Error('Not all files was loaded!');
    }

    return gltfShellMap;
  }

  public async loadGLTFCubeFacesTexts(filename: TCubeFacesTextsFilename): Promise<GLTF> {
    const gltfFacesTexts = await this.gltfLoader.loadAsync(
      `${this.FOLDER_WITH_MODELS}/${filename}`,
    );
    return gltfFacesTexts;
  }
}
