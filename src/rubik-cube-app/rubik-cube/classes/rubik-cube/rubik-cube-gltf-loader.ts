import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { IRubikCubeGLTFLoader } from '../../interfaces';

export class RubikCubeGLTFLoader<TShellFilename extends string, TPiecesFilenames extends string>
  implements IRubikCubeGLTFLoader<TShellFilename, TPiecesFilenames>
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

  public async loadGLTFCubeShell(filename: TShellFilename): Promise<GLTF> {
    return await this.gltfLoader.loadAsync(`${this.FOLDER_WITH_MODELS}/${filename}`);
  }
}
