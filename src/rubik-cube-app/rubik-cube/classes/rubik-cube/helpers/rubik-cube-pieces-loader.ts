import type { IRubikCubePiecesLoader } from '@/rubik-cube-app/rubik-cube/interfaces/rubik-cube-pieces-loader';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class RubikCubePiecesLoader<
  TPiecesWithFaces extends Record<TPiecesFilenames, string>,
  TPiecesFilenames extends string = Extract<keyof TPiecesWithFaces, string>,
> implements IRubikCubePiecesLoader<TPiecesWithFaces, TPiecesFilenames>
{
  private readonly FOLDER_WITH_MODELS: string = 'models';
  private readonly gltfLoader: GLTFLoader = new GLTFLoader();

  public async loadGltfPieces(
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
}
